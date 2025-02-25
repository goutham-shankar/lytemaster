'use client';

import { useState } from 'react';

const lightingProducts = [
  { name: 'BEAM', image: '/beam.png' },
  { name: 'BEAM SQ', image: '/beam-sq.png' },
  { name: 'DAZZLE', image: '/dazzle.png' },
  { name: 'GLOSS', image: '/gloss.png' },
  { name: 'GLAZE', image: '/glaze.png' },
  { name: 'APOLLO', image: '/apollo.png' },
  { name: 'SAPPHIRE', image: '/sapphire.png' },
  { name: 'AURA', image: '/aura.png' },
  { name: 'TITAN', image: '/titan.png' },
  { name: 'AMBER RD', image: '/amber-rd.png' },
];

export default function Category() {
  const [filters, setFilters] = useState({});

  return (
    <div className="flex flex-col md:flex-row p-8  min-h-screen mt-32">
      {/* Sidebar Filters */}
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute top-20 left-10">
        <div className="max-w-6xl mx-auto">HOME / PRODUCTS / CATEGORY / OBJECTS</div>
      </div>

      <aside className="w-full md:w-1/4 p-4 mt-8">
        

        <h2 className="text-xl font-semibold mb-2">Mounting Type</h2>
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
            <input type="checkbox" className="mr-2"  /> {item}
          </label>
        ))}
      </aside>
      <h1 className="absolute top-32 left-10 lg:left-48 text-4xl font-bold">SPOT DOWN SERIES</h1>
      <div className="hidden md:block w-px bg-black mx-4 relative mt-8">
      </div>
      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 mt-8">

        <p className="text-gray-600 mb-4">{lightingProducts.length} Results</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {lightingProducts.map((product, index) => (
            <div key={index} className=" p-4  ">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 border-2 border-solid border-black bg-gray-300 rounded-lg" />
              <h3 className="text-lg font-medium">{product.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
