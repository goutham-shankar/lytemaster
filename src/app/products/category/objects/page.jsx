'use client';

import { use, useState } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const lightingProducts = [
  { name: 'BEAM', image: '/assets/products/sample_bulb.png' },
  { name: 'BEAM SQ', image: '/assets/products/sample_bulb.png' },
  { name: 'DAZZLE', image: '/assets/products/sample_bulb.png' },
  { name: 'GLOSS', image: '/assets/products/sample_bulb.png' },
  { name: 'GLAZE', image: '/assets/products/sample_bulb.png' },
  { name: 'APOLLO', image: '/assets/products/sample_bulb.png' },
  { name: 'SAPPHIRE', image: '/assets/products/sample_bulb.png' },
  { name: 'AURA', image: '/assets/products/sample_bulb.png' },
  { name: 'TITAN', image: '/assets/products/sample_bulb.png' },
  { name: 'AMBER RD', image: '/assets/products/sample_bulb.png' },
];

export default function Objects() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();
  const family_name = searchParams.get('family_name'); 

  const toggleFilters = () => setShowFilters(prev => !prev);

  return (
    <div className="flex flex-col md:flex-row p-8 min-h-screen mt-44 relative">
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute -top-12 lg:left-20">
        <div className="max-w-6xl mx-auto"><Link href='/'>HOME</Link> / <Link href='/products'>PRODUCTS</Link> / <Link href='/products/category'>CATEGORY</Link> / OBJECTS</div>
      </div>

      {/* Filter Icon for Mobile */}
      <button
        onClick={toggleFilters}
        className="lg:hidden absolute top-[4.5rem] right-14 z-50 p-2 bg-white rounded shadow border border-black"
      >
        <FiFilter size={24} />
      </button>

      {/* Mobile Filters Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: showFilters ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 w-72 p-4 bg-white h-full z-40 overflow-y-auto shadow-lg pt-20"
      >
        <h2 className="text-xl font-semibold mb-2">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-2">Light Distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-2">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </motion.aside>

      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block w-full md:w-72 p-4 mt-12 lg:ml-16">
        <h2 className="text-xl font-semibold mb-2">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-2">Light Distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-2">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </aside>

      <h1 className="absolute top-0 left-10 lg:left-24 lg:text-5xl sm:text-4xl font-bold text-3xl">{family_name}</h1>
      <div className="hidden md:block w-px bg-black mx-4 relative mt-8"></div>

      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 mt-8">
        <p className="text-gray-600 mb-4">{lightingProducts.length} Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          {lightingProducts.map((product, index) => (
            <Link
            href={`/products/category/objects/item?product_name=${product.name}&family_name=${family_name}`}
            key={index}
          >
            <div className="p-1">
              <img
                src={product.image}
                alt={product.name}
                className="w-50 aspect-square object-cover mb-2 border-2 border-solid border-black bg-gray-300 rounded-lg"
              />
              <h3 className="text-lg font-medium">{product.name}</h3>
            </div>
          </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
