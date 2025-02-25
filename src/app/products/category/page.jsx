'use client';

import { useState } from 'react';

const lightingProducts = [
  { name: 'Spot Down Series', image: '/spot-down.png' },
  { name: 'Tracks System', image: '/tracks-system.png' },
  { name: 'Modular Series', image: '/modular-series.png' },
  { name: 'Panel & General Lighting', image: '/panel-general.png' },
  { name: 'Pendant Series', image: '/pendant-series.png' },
  { name: 'Ceiling Surface Series', image: '/ceiling-surface.png' },
  { name: 'Profile Series', image: '/profile-series.png' },
];

export default function CommercialLighting() {
  const [filters, setFilters] = useState({});

  return (
    <div className="flex flex-col md:flex-row p-8  min-h-screen mt-28">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 p-4  rounded-lg ">
        <h2 className="text-xl font-semibold mb-4">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Light distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input type="checkbox" className="mr-2" /> {item}
          </label>
        ))}
      </aside>
      <div className="hidden md:block w-px bg-black mx-4"></div>
      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 ">
        <h1 className="text-3xl font-bold mb-6">Commercial Lighting</h1>
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
