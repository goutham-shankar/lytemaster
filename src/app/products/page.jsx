"use client"
import CommercialImage from '@/assets/landing/commercial-lighting-thumbnail.jpeg'; // Adjust the path
import IndustrialImage from '@/assets/landing/industrial-lighting-thumbnail.jpeg'; // Adjust the path
import LandscapeImage from '@/assets/landing/hero-placeholder.jpeg'; // Adjust the path

import Image from 'next/image';

const products = [
  {
    title: "Commercial Lighting",
    description: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
    image: CommercialImage,
    count: 15,
  },
  {
    title: "Industrial Lighting",
    description: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
    image: IndustrialImage,
    count: 16,
  },
  {
    title: "Landscape Lighting",
    description: "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
    image: LandscapeImage,
    count: 14,
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col mt-28">
      {/* Breadcrumb */}
      <div className="p-4 text-sm">
        <div className="max-w-6xl mx-auto">HOME / PRODUCTS</div>
      </div>

      {/* Main Content */}
      <h2 className="text-5xl font-bold lg:mx-32 mx-5">Our Products</h2>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {products.map((product) => (
            <a href="/products/category" key={product.title}>
            <div 
              key={product.title} 
              className="h-[430px] rounded-2xl shadow-md overflow-hidden flex flex-col justify-between" 
              style={{ backgroundImage: `url(${product.image.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="py-12 p-6 bg-gradient-to-b from-black via-transparent to-transparent">
                <h3 className="text-3xl text-white font-bold mb-4">{product.title}</h3>
                <p className="text-white mb-4 m-3">{product.description}</p>
              </div>

              {/* Moved this to the bottom */}
              <div className=" flex items-center justify-evenly gap-2 text-lg font-medium text-white bg-blur rounded-full mx-12 p-4 text-center shadow-md shadow-black backdrop-blur-md m-4">
              <Image src="/assets/light_bulb_products.png" width={24} height={24} alt="Bulb" />
                {product.count} Products
                <div></div>
              </div>
            </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
