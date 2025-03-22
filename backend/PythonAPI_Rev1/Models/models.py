from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Category(Base):
    __tablename__ = 'category'
    category_id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String(50))
    families = relationship("Family", back_populates="category_rel")

class Family(Base):
    __tablename__ = 'family'
    family_id = Column(Integer, primary_key=True, index=True)
    family_name = Column(String(100))
    category = Column(Integer, ForeignKey('category.category_id'))
    image = Column(String(50))
    category_rel = relationship("Category", back_populates="families")
    products = relationship("Product", back_populates="family_rel")

class Product(Base):
    __tablename__ = 'products'
    product_id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(50))
    product_family = Column(Integer, ForeignKey('family.family_id'))
    product_color_temp = Column(String(100))
    product_optical_angle=Column(String(200))
    product_housing_color = Column(String(50))
    product_reflector_color = Column(String(50))
    product_control= Column(String(100))
    product_color_extended= Column(String(100))
    product_control_extended= Column(String(100))
    product_material= Column(String(100))
    product_mounting= Column(String(50))
    product_ip_rating= Column(String(50))
    product_lifetime= Column(String(50))
    product_sdcm= Column(String(10))
    product_wattage= Column(String(20))
    product_image= Column(String(20))
    product_technical_drawing= Column(String(20))
    product_light_distribution= Column(String(20))
    product_codes= Column(String(50))
    product_applications= Column(String(500))
    product_cri= Column(String(30))
    # Relations
    family_rel = relationship("Family", back_populates="products")
    wattages = relationship("ProductWattage", back_populates="product_rel")

class ProductWattage(Base):
    __tablename__ = 'product_wattage'
    product_wattage_id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey('products.product_id'))
    product_code = Column(String(50))
    product_wattage = Column(String(20))
    product_dimensions= Column(String(20))
    product_cut_out= Column(String(50))
    product_luminous_flux= Column(String(100))
    product_datasheet= Column(String(50))
    product_voltage= Column(String(50))
    product_current= Column(String(50))
    # Relations
    product_rel = relationship("Product", back_populates="wattages")