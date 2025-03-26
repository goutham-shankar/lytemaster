from pydantic import BaseModel

class CategoryWithCountResponse(BaseModel):
    category_id: int
    category_name: str
    product_count: int  # Changed field name

    class Config:
        orm_mode = True