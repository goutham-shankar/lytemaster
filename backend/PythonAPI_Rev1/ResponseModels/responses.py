from pydantic import BaseModel

# API (1)
class CategoryWithCountResponse(BaseModel):
    category_id: int
    category_name: str
    product_count: int  # Changed field name

    class Config:
        orm_mode = True

# API (4)
class ProductSearchResponse(BaseModel):
    product_id: int
    product_name: str

    class Config:
        orm_mode = True