'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Parameters from '@/components/products/parameters';
import Download from '@/components/products/download';
import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Item() {
  const [standardOpen, setStandardOpen] = useState(false);
  const [extendedOpen, setExtendedOpen] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [parameterItems, setParameterItems] = useState([]);
  const [selectedWattage, setSelectedWattage] = useState(null);
  const [ldDiagram, setLdDiagram] = useState(true);
  const [technicalDiagram, setTechnicalDiagram] = useState(true);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const productName = searchParams.get('product_name');
  const familyName = searchParams.get('family_name');
  const category_id = searchParams.get('category_id');
  const product_id = searchParams.get('product_id');

  useEffect(() => {
    if (category_id && product_id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category_id}/products`)
        .then((res) => {
          const product = res.data.find((item) => item.product_id == product_id);
          setCurrentProduct(product || null);
        })
        .catch((err) => console.error('Error fetching products:', err));
    }
  }, [category_id, product_id]);

  useEffect(() => {
    if (product_id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/product-wattages/${product_id}`)
        .then((res) => setParameterItems(res.data))
        .catch((err) => console.error('Error fetching wattages:', err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [product_id]);

  if (!currentProduct) return null;

  const getField = (field, fallback = 'Not Available') =>
    currentProduct?.[field] ?? fallback;

  const getImagePath = (type) => {
    const datasheet = selectedWattage?.product_datasheet || parameterItems[0]?.product_datasheet;
    if (!datasheet) return '/fake';
    return `${process.env.NEXT_PUBLIC_BASE_URL}/${type}/${datasheet.replace('.pdf', '')}.png`;
  };

  return (
    <div className="container mx-auto p-6 md:p-12 mt-32 overflow-hidden">
      {/* Breadcrumb */}
      <div className="p-4 text-sm absolute top-32 left-5 md:left-20">
        <div className="max-w-6xl mx-auto">
          <Link href="/">HOME</Link> / <Link href="/products">PRODUCTS</Link> /{' '}
          <Link href="/products/category">CATEGORY</Link> /{' '}
          <Link href="/products/category/objects">OBJECTS</Link> / ITEM
        </div>
      </div>

      {/* Title */}
      <div className="md:mx-12 mx-3">
        <h1 className="text-5xl font-bold my-4">{getField('product_name')}</h1>
        <p className="text-gray-500">
          {getField('product_codes')} | {familyName}
        </p>
      </div>

      {/* Images */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col md:flex-row gap-6 mt-6 md:px-10 px-0 justify-center items-center">
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${getField('product_name')}.png`}
            alt="Product"
            className="md:w-96 w-80 aspect-square rounded-2xl border-2 border-black"
          />
          <img
            src={getImagePath('light_distribution')}
            onError={() => setLdDiagram(false)}
            alt="Light Distribution"
            className={`md:h-96 w-1/2 lg:w-auto rounded-2xl border-2 border-black aspect-square object-cover object-center ${ldDiagram ? '' : 'hidden'}`}
          />
          <img
            src={getImagePath('diagram')}
            onError={() => setTechnicalDiagram(false)}
            alt="Technical Diagram"
            className={`md:h-96 w-1/2 lg:w-auto rounded-2xl border-2 border-black aspect-square object-cover object-center ${technicalDiagram ? '' : 'hidden'}`}
          />
        </div>
      </div>

      {/* Specs */}
      <div className="flex flex-col lg:flex-row justify-evenly lg:mx-40 w-full mt-8 mb-8 px-5">
        <div className="flex flex-col gap-8 w-full">
          <div>
            <h2 className="text-xl font-semibold">General</h2>
            <p>{getField('product_mounting')}</p>
            <p>{getField('product_wattage')}</p>
            <p>{getField('product_lifetime')}</p>
            <p>CRI: {getField('product_cri')}</p>
            <p>SDCM: {getField('product_sdcm')}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Electrical</h2>
            <p>{getField('product_control')}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Physical</h2>
            <p>{getField('product_material')}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Optical</h2>
            <p>{getField('product_light_distribution')}</p>
            <p>Beam Angle: {getField('product_optical_angle')}</p>
          </div>
        </div>

        {/* Configurations */}
        <div className="mt-8 lg:ml-12 w-full">
          {[{
            label: 'Standard Configuration',
            open: standardOpen,
            toggle: () => setStandardOpen(!standardOpen),
            tempField: 'product_color_temp',
            angleField: 'product_optical_angle',
            extraFields: [
              { label: 'COLOUR (Housing)', value: getField('product_housing_color') },
              { label: 'COLOUR (Reflector)', value: getField('product_reflector_color') }
            ]
          }, {
            label: 'Extended Configuration',
            open: extendedOpen,
            toggle: () => setExtendedOpen(!extendedOpen),
            tempField: 'product_color_extended',
            angleField: null,
            extraFields: [
              { label: 'CONTROL', value: getField('product_control_extended') }
            ]
          }].map(({ label, open, toggle, tempField, angleField, extraFields }, i) => (
            <div key={label} className="border-b w-96 border-black mt-4">
              <div className="flex justify-between items-center">
                <button onClick={toggle} className="w-full text-left text-lg font-semibold py-2 px-4">
                  {label}
                </button>
                <div>{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
              </div>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden my-4 mx-5"
                >
                  {showDownloads ? (
                    <>
                      <p className="font-semibold">Color Temperature</p>
                      {getField(tempField).split(',').map((temp) => (
                        <div key={temp} className="flex items-center gap-2">
                          <input type="checkbox" id={`conf-temp-${temp}`} value={temp} />
                          <label htmlFor={`conf-temp-${temp}`}>{temp}</label>
                        </div>
                      ))}
                      {angleField && (
                        <>
                          <p className="font-semibold mt-2">Optical</p>
                          {getField(angleField).split(',').map((angle) => (
                            <div key={angle} className="flex items-center gap-2">
                              <input type="checkbox" id={`conf-angle-${angle}`} value={angle} />
                              <label htmlFor={`conf-angle-${angle}`}>{angle}</label>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p><strong>COLOUR TEMPERATURE:</strong> {getField(tempField)}</p>
                      {extraFields.map(({ label, value }) => (
                        <p key={label}><strong>{label}:</strong> {value}</p>
                      ))}
                      {angleField && (
                        <p><strong>OPTICAL:</strong> {getField(angleField)}</p>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Parameters or Downloads */}
      {!showDownloads ? (
        <Parameters
          setShowDownloads={setShowDownloads}
          setSelectedWattage={setSelectedWattage}
          parameterItems={parameterItems}
          loading={loading}
        />
      ) : (
        <Download selectedWattage={selectedWattage} />
      )}
    </div>
  );
}
