'use client';

import { useState } from 'react';

const parameters = [
        { model: 'LM-022-DLZ3L*-12W', dimension: '93X85', cutout: '78', power: '12W', flux: '1020lm' },
        { model: 'LM-022-DLZ3L*-15W', dimension: '108X85', cutout: '100', power: '15W', flux: '1275lm' },
        { model: 'LM-022-DLZ3L*-20W', dimension: '120X102', cutout: '110', power: '20W', flux: '1700lm' },
        { model: 'LM-022-DLZ3L*-30W', dimension: '140X120', cutout: '125', power: '30W', flux: '2550lm' },
        { model: 'LM-022-DLZ3L*-40W', dimension: '160X117', cutout: '150', power: '40W', flux: '3400lm' },
      ];


export default function Item() {
        const [standardOpen, setStandardOpen] = useState(false);
        const [extendedOpen, setExtendedOpen] = useState(false);
  return (
    <div className="container mx-auto p-6 md:p-12 mt-32">
      {/* Sidebar Filters */}
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute top-20 left-10">
        <div className="max-w-6xl mx-auto">HOME / PRODUCTS / CATEGORY / OBJECTS / ITEM</div>
      </div>
        {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Dazzle</h1>
      <p className="text-gray-500">LM-022-DLZ3L | Spot Down Series</p>

      {/* Images Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <img src="/spot-down.png" alt="Dazzle Light" className="w-full rounded-lg shadow-md" />
        <img src="/cutout-diagram.png" alt="Cutout Diagram" className="w-full rounded-lg shadow-md" />
        <div className="grid grid-row-4">
          <img src="/beam-angle-12w.png" alt="Beam 12W" className="rounded-lg shadow-md" />
          <img src="/beam-angle-20w.png" alt="Beam 20W" className="rounded-lg shadow-md" />
          <img src="/beam-angle-30w.png" alt="Beam 30W" className="rounded-lg shadow-md" />
          <img src="/beam-angle-40w.png" alt="Beam 40W" className="rounded-lg shadow-md" />
        </div>
      </div>
        <div className='flex flex-col lg:flex-row flex-1 justify-center '>
      {/* Specifications */}
      <div className="mt-8 flex flex-col gap-8">
        <div>
          <h2 className="text-xl font-semibold">General</h2>
          <p>Recessed, IP20</p>
          <p>12W-40W 2700K, 3000K, 4000K, 5000K, 6000K</p>
          <p>65000h @L80 CRI ≥80/90</p>
          <p>SDCM: &lt;3</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Electrical</h2>
          <p>NON-DIM, PHASE 1-10V, DALI BLUETOOTH</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Physical</h2>
          <p>Die Cast Aluminium</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Optical</h2>
          <p>Direct illumination</p>
          <p>Beam angle 15°/24°/38°/60°</p>
          <p>Optical accessories</p>
        </div>
      </div>
      {/* Expandable Configurations */}
      <div className="mt-8 ml-32">
        <button
          onClick={() => setStandardOpen(!standardOpen)}
          className="w-full text-left text-lg font-semibold py-2 px-4   mb-2  border-b border-black"
        >
          Standard Configuration {standardOpen ? '▲' : '▼'}
        </button>
        {standardOpen && <p className="p-4 border rounded-md">Details about standard configuration.</p>}

        <button
          onClick={() => setExtendedOpen(!extendedOpen)}
          className="w-full text-left text-lg font-semibold py-2 px-4    border-b border-black"
        >
          Extended Configuration {extendedOpen ? '▲' : '▼'}
        </button>
        {extendedOpen && <p className="p-4 border rounded-md">Details about extended configuration.</p>}
      </div>
      </div>

      {/* Parameters Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Parameters</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full  border-gray-200 rounded-lg">
            <thead>
              <tr className="">
                <th className="py-2 px-4 ">Model</th>
                <th className="py-2 px-4 ">Dimension (DxH)</th>
                <th className="py-2 px-4 ">Cut out (mm)</th>
                <th className="py-2 px-4 ">Power</th>
                <th className="py-2 px-4 ">Luminous Flux</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((item, index) => (
                <tr key={index} className="border-b border-black">
                  <td className="py-4 px-4 ">{item.model}</td>
                  <td className="py-4 px-4 ">{item.dimension}</td>
                  <td className="py-4 px-4 ">{item.cutout}</td>
                  <td className="py-4 px-4 ">{item.power}</td>
                  <td className="py-4 px-4 ">{item.flux}</td>
                  <hr></hr>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      
    </div>
  );
}
