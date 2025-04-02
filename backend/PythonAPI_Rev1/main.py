from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status, Query, Path, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import cast, Integer, or_, and_, exists, func, within_group, select
from sqlalchemy.orm import Session
from Models.models import Category, Family, Product, ProductWattage, Base
import database
from database import engine, SessionLocal
from typing import List, AsyncIterator
from ResponseModels.responses import CategoryWithCountResponse
import os

# Lifespan manager
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handles startup and shutdown events"""
    # Startup: Create tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
    yield
    # Shutdown: Clean up resources
    print("🛑 Application shutting down")

app = FastAPI(
    title="Lytemaster API",
    version="1.0.0",
    lifespan=lifespan  # Use lifespan instead of on_event
)

# Add CORS middleware
origins = [
"*"
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,  # Allow only specified origins
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# FUNCTIONS -H1
# (1) for Parsing wattage and color_temp
def parse_wattage_range(wattage_str: str):
    """Extract min and max wattage from a range string like '3W-40W'"""
    try:
        # Remove 'W' and split by '-'
        min_w, max_w = wattage_str.replace("W", "").split("-")
        return int(min_w), int(max_w)
    except (ValueError, AttributeError):
        return None, None

def parse_color_temp(color_temp_str: str):
    """Extract individual color temperatures from a string like '4000K,5000K,6000K'"""
    try:
        # Remove 'K' and split by ','
        return [int(temp.replace("K", "")) for temp in color_temp_str.split(",")]
    except (ValueError, AttributeError):
        return []


# API ENDPOINTS -H1
# (1) GET categories along with their id, name, and the number of products in them (eliminates need for 2nd api call to get product count)
@app.get("/categories", response_model=List[CategoryWithCountResponse])
def get_categories_with_product_counts(db: Session = Depends(get_db)):
    # Get product count per category via Category → Family → Product
    stmt = (
        select(
            Category.category_id,
            Category.category_name,
            func.count(Product.product_id).label("product_count")  # Count PRODUCTS, not families
        )
        .outerjoin(Family, Category.families)  # Join Category → Family
        .outerjoin(Product, Family.products)  # Join Family → Product
        .group_by(Category.category_id, Category.category_name)
    )

    result = db.execute(stmt).all()

    return [
        {
            "category_id": category_id,
            "category_name": category_name,
            "product_count": product_count  # Key changed from family_count → product_count
        } for category_id, category_name, product_count in result
    ]


# (2) GET number of products by category (cta_button) -> included in (1)
@app.get("/home/products/products_button/{category_id}")
async def get_product_counts_by_category(
        category_id: int = Path(..., description="ID of the category to count products for"),
        db: Session = Depends(get_db)
):
    """Get the number of products for a specific category"""
    try:
        # Query to count products for the specified category
        product_count = db.query(
            func.count(Product.product_id).label("product_count")
        ).join(Family, Family.family_id == Product.product_family) \
            .filter(Family.category == category_id) \
            .scalar()

        # If no products are found, return 0
        if product_count is None:
            return 0

        return product_count
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch product count: {str(e)}"
        )

# (3) GET products by category
@app.get("/categories/{category_id}/products")
async def get_category_products(category_id: int, db: Session = Depends(get_db)):
    category_products = db.query(Product).join(Family).filter(Family.category == category_id).all()
    return category_products


# (4) GET search products using filters (LVL 1 Search)
@app.get("/products/searchbar/products_search")
async def search_products(
    query: str = Query(..., description="Search term for product name, category, or family"),
    skip: int = Query(0, description="Number of items to skip"),
    limit: int = Query(10, description="Maximum number of items to return"),
    db: Session = Depends(get_db)
):
    search_query_db = db.query(Product).join(Family).join(Category).filter(
        or_(
            Product.product_name.ilike(f"%{query}%"),
            Family.family_name.ilike(f"%{query}%"),
            Category.category_name.ilike(f"%{query}%")
        )
    ).offset(skip).limit(limit)
    return search_query_db.all()


# (5) Detailed Object Level Filter
@app.get("/products/product_details/filter")
async def filtering_products(
    search_query: str = Query(None, description="Search term for product name or description"),
    category: str = Query(None, description="Filter by category"),
    min_wattage: int = Query(None, description="Minimum wattage"),
    color_temp: int = Query(None, description="Filter by color temperature in Kelvin"),
    db: Session = Depends(get_db)
):
    """Search for products by name, category, wattage, or color temperature"""
    try:
        # Base query
        search_query_db = db.query(Product)

        # Apply filters
        if search_query:
            search_query_db = search_query_db.filter(
                Product.product_name.ilike(f"%{search_query}%")
            )
        if category:
            search_query_db = search_query_db.join(Family).join(Category).filter(
                Category.category_name.ilike(f"%{category}%")
            )
        if min_wattage:
            # Filter by wattage range
            search_query_db = search_query_db.filter(
                or_(
                    *[
                        and_(
                            parse_wattage_range(Product.product_wattage)[0] <= min_wattage,
                            parse_wattage_range(Product.product_wattage)[1] >= min_wattage
                        )
                        for product in search_query_db
                        if parse_wattage_range(Product.product_wattage) != (None, None)
                    ]
                )
            )
        if color_temp:
            # Filter by color temperature
            search_query_db = search_query_db.filter(
                or_(
                    *[
                        color_temp in parse_color_temp(Product.product_color_temp)
                        for product in search_query_db
                        if parse_color_temp(Product.product_color_temp)
                    ]
                )
            )

        # Execute query
        results = search_query_db.all()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Search failed: {str(e)}"
        )


# (6) GET Products Category specific family list (LVL 2 Search and Filter)
@app.get("/products/category/{category_id}/families")
async def get_filtered_families_by_category(
    category_id: int = Path(..., description="ID of the category to fetch families for"),
    mounting_type: str = Query(None, description="Filter by mounting type (e.g., Ceiling recessed)"),
    light_distribution: str = Query(None, description="Filter by light distribution (e.g., A10-A32 wide 100% direct)"),
    lamp_type: str = Query(None, description="Filter by lamp type (e.g., LED)"),
    db: Session = Depends(get_db)
):
    """Get families belonging to a specific category, where at least one product matches the filters"""
    try:
        # Base query: Filter families by category_id
        family_query = db.query(Family).filter(
            Family.category == category_id
        )

        # Apply product filters using a subquery
        if mounting_type or light_distribution or lamp_type:
            family_query = family_query.filter(
                exists().where(
                    and_(
                        Product.product_family == Family.family_id,  # Join condition
                        *(  # Dynamic filters
                            (Product.product_mounting.ilike(f"%{mounting_type}%")) if mounting_type else True,
                            (Product.product_light_distribution.ilike(f"%{light_distribution}%")) if light_distribution else True,
                            (Product.product_lamp_type.ilike(f"%{lamp_type}%")) if lamp_type else True,
                        )
                    )
                )
            )

        # Execute query
        families = family_query.all()

        # If no families are found, raise a 404 error
        if not families:
            raise HTTPException(
                status_code=404,
                detail=f"No families found for category ID {category_id} with the specified filters"
            )

        return families
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch families: {str(e)}"
        )


# (7) GET Filter products within a specific category and specific family and other filters
# (LVL 3 Search and Filter)
@app.get("/products/category/{category_id}/{family_id}/filter")
async def filter_products_in_category(
    category_id: int = Path(..., description="ID of the category to filter products in"),
    family_id:int=Path(...,description="ID of the family to filter products in"),
    mounting_type: str = Query(None, description="Filter by mounting type (e.g., Ceiling recessed)"),
    light_distribution: str = Query(None, description="Filter by light distribution (e.g., A10-A32 wide 100% direct)"),
    ip_rating:str=Query(None,description="Filter by ip ratings (e.g., IP20)"),
    lamp_type: str = Query(None, description="Filter by lamp type (e.g., LED)"),
    skip: int = Query(0, description="Number of items to skip"),
    limit: int = Query(10, description="Maximum number of items to return"),
    db: Session = Depends(get_db)
):
    """Filter products within a specific category and specific family by mounting type, light distribution, and lamp type"""
    try:
        # Base query: Filter products by category ID
        filter_query = db.query(Product).join(Family).filter(
            Family.category == category_id,
            Product.product_family == family_id
        )

        # Apply additional filters
        if mounting_type:
            filter_query = filter_query.filter(
                Product.product_mounting.ilike(f"%{mounting_type}%")
            )
        if light_distribution:
            filter_query = filter_query.filter(
                Product.product_light_distribution.ilike(f"%{light_distribution}%")
            )
        if lamp_type:
            filter_query = filter_query.filter(
                Product.product_lamp_type.ilike(f"%{lamp_type}%")
            )
        if ip_rating:
            filter_query = filter_query.filter(
                Product.product_ip_rating.ilike(f"%{ip_rating}%")
            )

        # Execute query
        results = filter_query.offset(skip).limit(limit).all()
        return results
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Filtering failed: {str(e)}"
        )

@app.get("/images/{image_filename}")
async def get_secure_product_image(image_filename: str):
    """Serve images securely only to authenticated users."""
    IMG_DIR = "./assets/product_imgs"
    image_path = os.path.join(IMG_DIR, image_filename)

    # Check if the file exists
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")

    # Read and return the image as a response
    with open(image_path, "rb") as image_file:
        return Response(content=image_file.read(), media_type="image/jpeg")
    
@app.get("/product-wattages/{product_id}", response_model=List[dict])
def get_product_wattages(product_id: int, db: Session = Depends(get_db)):
    """Retrieve all data from the ProductWattage table for a specific product ID."""
    try:
        # Query product wattages for the given product ID
        product_wattages = db.query(ProductWattage).filter(ProductWattage.product_id == product_id).all()
        
        # Convert to list of dictionaries
        return [
            {
                "product_wattage_id": pw.product_wattage_id,
                "product_id": pw.product_id,
                "product_code": pw.product_code,
                "product_wattage": pw.product_wattage,
                "product_dimensions": pw.product_dimensions,
                "product_cut_out": pw.product_cut_out,
                "product_luminous_flux": pw.product_luminous_flux,
                "product_datasheet": pw.product_datasheet,
                "product_voltage": pw.product_voltage,
                "product_current": pw.product_current,
            }
            for pw in product_wattages
        ]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch product wattages: {str(e)}"
        )
