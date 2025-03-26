'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import Link from 'next/link';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const lightingProducts = [
  { name: 'Spot Down Series', image: '/assets/products/sample_bulb.png' },
  { name: 'Tracks System', image: '/assets/products/sample_bulb.png' },
  { name: 'Modular Series', image: '/assets/products/sample_bulb.png' },
  { name: 'Panel & General Lighting', image: '/assets/products/sample_bulb.png' },
  { name: 'Pendant Series', image: '/assets/products/sample_bulb.png' },
  { name: 'Ceiling Surface Series', image: '/assets/products/sample_bulb.png' },
  { name: 'Profile Series', image: '/assets/products/sample_bulb.png' },
];

export default function Category() {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [categoryName, setCategoryName] = useState('Loading...');

  const searchParams = useSearchParams();
  const category_id = searchParams.get('category_id');

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        console.log('ID',category_id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`);
        console.log('API Response:', response.data); // Debugging step
        const category = response.data.find(cat => String(cat.category_id) === String(category_id));
  
        if (category) {
          setCategoryName(category.category_name);
          console.log('catname Response:', category.category_name);;
        } else {
          setCategoryName('Category Not Found');
        }
      } catch (error) {
        console.error('Error fetching category:', error);
        setCategoryName('Error Loading Category');
      }
    };
  
    fetchCategory();
  }, [category_id]);
  

  // Handle filter checkbox state
  const handleFilterChange = (category, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: prevFilters[category] ? [...prevFilters[category], value] : [value],
    }));
  };

  // Toggle the mobile filter menu
  const toggleFilters = () => setShowFilters(prev => !prev);

  return (
    <div className="flex flex-col md:flex-row p-8 min-h-screen mt-44 relative">
      <div className="p-4 text-sm absolute -top-12 left-2 lg:left-20">
        <div className="max-w-6xl mx-auto">
          <Link href="/">HOME</Link> / <Link href="/products">PRODUCTS</Link> / CATEGORY
        </div>
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
        <h2 className="text-xl font-semibold mb-4">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              onChange={() => handleFilterChange('mountingType', item)}
              className="mr-2"
            /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Light distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              onChange={() => handleFilterChange('lightDistribution', item)}
              className="mr-2"
            /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700 mb-2">
            <input
              type="checkbox"
              onChange={() => handleFilterChange('lampType', item)}
              className="mr-2"
            /> {item}
          </label>
        ))}
      </motion.aside>

      {/* Sidebar Filters for Desktop */}
      <aside className="hidden lg:block w-full md:w-72 p-4 rounded-lg mt-16 lg:ml-20">
        <h2 className="text-xl font-semibold mb-4">Mounting type</h2>
        {['Ceiling recessed', 'Recessed Suspended', 'Surface Mounted', 'Suspended', 'Surface Suspended Recessed'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input
              type="checkbox"
              onChange={() => handleFilterChange('mountingType', item)}
              className="mr-2"
            /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Light distribution</h2>
        {['A10-A32 wide 100% direct', 'A40-A44 medium 100% direct', 'A50-A80 narrow 100% direct', 'B41-B63 narrow direct'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input
              type="checkbox"
              onChange={() => handleFilterChange('lightDistribution', item)}
              className="mr-2"
            /> {item}
          </label>
        ))}

        <h2 className="text-xl font-semibold mt-6 mb-4">Lamp Type</h2>
        {['LED', 'CONLGB'].map((item) => (
          <label key={item} className="block text-gray-700">
            <input
              type="checkbox"
              onChange={() => handleFilterChange('lampType', item)}
              className="mr-2"
            /> {item}
          </label>
        ))}
      </aside>

      <h1 className="absolute top-0 md:left-10 left-5 lg:left-24 md:text-5xl sm:text-4xl text-3xl font-bold">{categoryName}</h1>
      <div className="hidden md:block w-px bg-black mx-4 relative mt-8"></div>

      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 mt-8">
        <p className="text-gray-600 mb-4">{lightingProducts.length} Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          {lightingProducts.map((product, index) => (
            <a href="/products/category/objects/" key={index}>
              <div className="p-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-50 aspect-square object-cover mb-2 border-2 border-solid border-black bg-gray-300 rounded-lg"
                />
                <h3 className="text-lg font-medium">{product.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
