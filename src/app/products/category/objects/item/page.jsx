'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch error

  return (
    <div className="container mx-auto p-6 md:p-12 mt-32 overflow-hidden">
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute top-32 left-5 md:left-20">
        <div className="max-w-6xl mx-auto">HOME / PRODUCTS / CATEGORY / OBJECTS / ITEM</div>
      </div>

      {/* Title */}
     <div className='mx-12'>
     <h1 className="text-5xl font-bold my-4">Dazzle</h1>
     <p className="text-gray-500">LM-022-DLZ3L | Spot Down Series</p>
     </div>

      {/* Images Section */}
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="flex flex-col lg:flex-row gap-6 mt-6 w-full max-w-6xl px-10">
          <img
            src="https://png.pngtree.com/element_pic/16/12/06/5d79b5dd066400e188713f7dd417a3f4.png"
            alt="Dazzle Light"
            className="lg:flex-[0.4] w-full max-w-sm rounded-2xl border-2 border-black"
          />
          <img
            src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-cartoon-illustration-free-light-bulb-image_1179369.jpg"
            alt="Cutout Diagram"
            className="lg:flex-[0.4] w-full max-w-sm rounded-2xl border-2 border-black"
          />
          <img
            src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-cartoon-illustration-free-light-bulb-image_1179369.jpg"
            alt="Cutout Diagram"
            className="lg:flex-[0.2] w-full max-w-sm rounded-2xl border-2 border-black"
          />
        </div>
      </div>

      {/* Specifications */}
      {/* ADDED: mt-8 mb-8 to give extra margin around the entire Specifications section */}
      <div className="flex flex-col lg:flex-row flex-1 justify-evenly lg:mx-40 w-full overflow-hidden mt-8 mb-8 px-5">
        <div className="flex flex-col gap-8 w-full">
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
        <div className="mt-8 lg:ml-12 w-full">
          <div className='border-b w-96 border-black'>
          <button
            onClick={() => setStandardOpen(!standardOpen)}
            className="w-full text-left text-lg font-semibold py-2 px-4 "
          >
            Standard Configuration {standardOpen ? '▲' : '▼'}
          </button>
          {standardOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: standardOpen ? 'auto' : 0, opacity: standardOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="p-4 rounded-md">Details about standard configuration.</p>
            </motion.div>
          )}
          </div>

          {/* ADDED: mt-4 on the button and my-4 on the motion div for extra margin */}
          <div className='border-b w-96 border-black'>
          <button
            onClick={() => setExtendedOpen(!extendedOpen)}
            className="w-full text-left text-lg font-semibold py-2 px-4 mt-4"
          >
            Extended Configuration {extendedOpen ? '▲' : '▼'}
          </button>
          {extendedOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: extendedOpen ? 'auto' : 0, opacity: extendedOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden my-4"
            >
              <p className="p-4 rounded-md">Details about extended configuration.</p>
            </motion.div>
          )}</div>
        </div>
      </div>

      {/* Parameters Table */}
      <div className="mt-8 w-full lg:px-44">
        <h2 className="text-2xl font-bold">Parameters</h2>
        <table className="min-w-full border-collapse border-gray-200 rounded-lg text-sm my-4">
          <thead>
            <tr className="border-b border-black">
              <th className="py-2 px-4">Model</th>
              <th className="py-2 px-4">Dimension (DxH)</th>
              <th className="py-2 px-4">Cut out (mm)</th>
              <th className="py-2 px-4">Power</th>
              <th className="py-2 px-4">Luminous Flux</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((item, index) => (
              <tr key={index} className="border-b border-black text-center">
                <td className="py-4 px-4">{item.model}</td>
                <td className="py-4 px-4">{item.dimension}</td>
                <td className="py-4 px-4">{item.cutout}</td>
                <td className="py-4 px-4">{item.power}</td>
                <td className="py-4 px-4">{item.flux}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
