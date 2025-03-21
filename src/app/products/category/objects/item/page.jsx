'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Parameters from '@/components/products/parameters';
import Download from '@/components/products/download';
import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Item() {
  const [standardOpen, setStandardOpen] = useState(false);
  const [extendedOpen, setExtendedOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch error

  return (
    <div className="container mx-auto p-6 md:p-12 mt-32 overflow-hidden">
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute top-32 left-5 md:left-20">
        <div className="max-w-6xl mx-auto">
          <Link href='/'>HOME</Link> / <Link href='/products'>PRODUCTS</Link> / <Link href='/products/category'>CATEGORY</Link> / <Link href='/products/category/objects'>OBJECTS</Link> / ITEM
        </div>
      </div>

      {/* Title */}
      <div className="md:mx-12 mx-3">
        <h1 className="text-5xl font-bold my-4">Dazzle</h1>
        <p className="text-gray-500">LM-022-DLZ3L | Spot Down Series</p>
      </div>

      {/* Images Section */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col md:flex-row lg:gap-6 gap-6 mt-6 md:px-10 px-0 justify-center items-center">
          <img
            src='/assets/products/sample_bulb.png'
            alt="Dazzle Light"
            className="md:w-96 w-80 aspect-square rounded-2xl border-2 border-black"
          />
          <img
            src='/assets/products/sample_bulb_cutout.png'
            alt="Cutout Diagram"
            className="md:w-96 w-80 aspect-square rounded-2xl border-2 border-black"
          />
          <img
            src='/assets/products/sample_bulb_watt.png'
            alt="Cutout Diagram"
            className="md:h-96 w-full lg:w-auto rounded-2xl border-2 border-black"
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
          <div className="border-b w-96 border-black">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStandardOpen(!standardOpen)}
                className="w-full text-left text-lg font-semibold py-2 px-4"
              >
                Standard Configuration
              </button>
              <div>
                {standardOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            {standardOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {showDownloads ? (
                  <div className="mb-4 mx-5">
                    <p className="font-semibold">Color Temperature</p>
                    {['3000K', '4000K', '6000K'].map((temp) => (
                      <div key={temp} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`ext-temp-${temp}`}
                          name="ext-temp"
                          value={temp}
                        />
                        <label htmlFor={`ext-temp-${temp}`}>{temp}</label>
                      </div>
                    ))}
                    <p className="font-semibold">Optical</p>
                    {['15°', '24°', '38°', '60°'].map((angle) => (
                      <div key={angle} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`std-optical-${angle}`}
                          name="std-optical"
                          value={angle}
                        />
                        <label htmlFor={`std-optical-${angle}`}>
                          {angle}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-md">
                    <p>
                      <strong>COLOUR TEMPERATURE:</strong> 3000K, 4000K, 6000K
                    </p>
                    <p>
                      <strong>CONTROL:</strong> NON-DIM
                    </p>
                    <p>
                      <strong>OPTICAL:</strong> 15°/24°/38°/60°
                    </p>
                    <p>
                      <strong>COLOUR (Housing):</strong> White, Black
                    </p>
                    <p>
                      <strong>COLOUR (Reflector):</strong> Aluminium
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Extended Configuration */}
          <div className="border-b w-96 border-black">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setExtendedOpen(!extendedOpen)}
                className="w-full text-left text-lg font-semibold py-2 px-4 mt-4"
              >
                Extended Configuration
              </button>
              <div>
                {extendedOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            {extendedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden my-4"
              >
                {showDownloads ? (
                  <div className="mb-4 mx-4">
                    <p className="font-semibold">Color Temperature</p>
                    {['2700K', '5000K'].map((temp) => (
                      <div key={temp} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`ext-temp-${temp}`}
                          name="ext-temp"
                          value={temp}
                        />
                        <label htmlFor={`ext-temp-${temp}`}>{temp}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-md">
                    <p>
                      <strong>COLOUR TEMPERATURE:</strong> 2700K, 5000K
                    </p>
                    <p>
                      <strong>CONTROL:</strong> DALI, PHASE, 1-10V
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Conditionally render Parameters or Downloads */}
      {!showDownloads ? (
        <Parameters onRowClick={() => setShowDownloads(true)} />
      ) : (
        <Download />
      )}
    </div>
  );
}