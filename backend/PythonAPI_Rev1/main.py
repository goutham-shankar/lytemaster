from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status, Query,Path
from sqlalchemy import cast, Integer, or_, and_, exists, func
from sqlalchemy.orm import Session
from Models.models import Category, Family, Product, ProductWattage, Base
import database
from database import engine, SessionLocal
from typing import List, AsyncIterator
from pydantic import BaseModel

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

# Pydantic model for response validation
class CategoryResponse(BaseModel):
    category_id: int
    category_name: str

    class Config:
        orm_mode = True  # Enable ORM compatibility

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

'''
# ----- Example Endpoint Using DB -----
# Categories endpoint
#------COMMENTED FROM HERE--------------
# @app.get(
#     "/categories",
#     response_model=List[CategoryResponse],
#     summary="Get all product categories",
#     tags=["Categories"]
# )
# async def get_categories(db: Session = Depends(get_db)):
#     """Retrieve all available product categories from the database"""
#     try:
#         categories = db.query(Category).all()
#         if not categories:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="No categories found"
#             )
#         return categories
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Database operation failed: {str(e)}"
#         )
#
# # Sample Family endpoint
# @app.get("/families", response_model=List[dict], tags=["Families"])
# async def get_families(db: Session = Depends(get_db)):
#     """Get all product families with their category"""
#     try:
#         families = db.query(Family).all()
#         return [
#             {
#                 "family_id": fam.family_id,
#                 "name": fam.family_name,
#                 "category_id": fam.category
#             }
#             for fam in families
#         ]
#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=f"Error retrieving families: {str(e)}"
#         )
# # ----- Product Endpoints -----
# @app.get("/products/{product_id}")
# async def get_product(
#         product_id: int,
#         db: Session = Depends(get_db)
# ):
#     product = db.query(Product).filter(Product.product_id == product_id).first()
#     if not product:
#         raise HTTPException(status_code=404, detail="Product not found")
#
#     # Include wattage details
#     wattages = db.query(ProductWattage).filter(
#         ProductWattage.product_id == product_id
#     ).all()
#
#     return {
#         "product": product,
#         "wattages": wattages
#     }
#------COMMENTED TILL HERE--------------
'''

# GET number of products by category (cta_button)
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

# GET products by category
@app.get("/categories/{category_id}/products")
async def get_category_products(category_id: int,db: Session=Depends(get_db)):
    category_products = db.query(Product).join(Family).filter(Family.category == category_id).all()
    return category_products


# FUNCTIONS for Parsing wattage and color_temp
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

# GET search products using filters (LVL 1 Search)
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

# Detailed Object Level Filter
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

# GET Products Category specific family list (LVL 2 Search and Filter)
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

# GET Filter products within a specific category and specific family and other filters
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

