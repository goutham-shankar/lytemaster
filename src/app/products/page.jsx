"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col mt-28">
      {/* Breadcrumb */}
      <div className="p-4 text-sm">
        <div className="max-w-6xl mx-auto lg:mx-28">HOME / PRODUCTS</div>
      </div>

      {/* Main Content */}
      <h2 className="text-5xl font-bold lg:mx-32 mx-5">Our Products</h2>
      <main className="flex-1 max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {products.map((product) => (
          <a href={`/products/category?categoryId=${product.slug}`} key={product.slug}>

              <div 
                className="h-[460px] rounded-2xl shadow-md overflow-hidden flex flex-col justify-between" 
                style={{ backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
              >
                <div className="py-12 p-6 bg-gradient-to-b from-black via-transparent to-transparent">
                  <h3 className="text-3xl text-white font-bold mb-4">{product.title}</h3>
                  <p className="text-white mb-4 m-3">{product.description}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-evenly gap-2 text-lg font-medium text-white bg-blur rounded-full mx-14 p-2 text-center shadow-md shadow-black backdrop-blur-md m-4">
                  <Image src="/assets/products/light_bulb_products.png" width={20} height={20} alt="Bulb" />
                  {product.count} Products
                </div>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
