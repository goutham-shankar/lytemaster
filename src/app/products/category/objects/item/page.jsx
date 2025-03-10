'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Parameters from '@/components/products/parameters';

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
          {/* Standard Configuration */}
          <div className='border-b w-96 border-black'>
            <button
              onClick={() => setStandardOpen(!standardOpen)}
              className="w-full text-left text-lg font-semibold py-2 px-4"
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
                <div className="p-4 rounded-md">
                  <p><strong>COLOUR TEMPERATURE:</strong> 3000K, 4000K, 6000K</p>
                  <p><strong>CONTROL:</strong> NON-DIM</p>
                  <p><strong>OPTICAL:</strong> 15°/24°/38°/60°</p>
                  <p><strong>COLOUR (Housing):</strong> White, Black</p>
                  <p><strong>COLOUR (Reflector):</strong> Aluminium</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Extended Configuration */}
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
                <div className="p-4 rounded-md">
                  <p><strong>COLOUR TEMPERATURE:</strong> 2700K, 5000K</p>
                  <p><strong>CONTROL:</strong> DALI, PHASE, 1-10V</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Parameters />
    </div>
  );
}
