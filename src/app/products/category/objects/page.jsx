'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function Objects() {
  const searchParams = useSearchParams();
  
  // Get family_id, category_id from the URL
  const category_id = searchParams.get('category_id');
  const family_id = searchParams.get('family_id');
  const family_name = searchParams.get('family_name');

  // State declarations
  const [lightingProducts, setLightingProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [availableFilters, setAvailableFilters] = useState({
    product_color_temp: [],
    product_optical_angle: [],
    product_housing_color: [],
    product_reflector_color: [],
    product_control: [],
    product_color_extended: [],
    product_control_exntended: [],
    product_material: [],
    product_mounting: [],
    product_ip_rating: [],
    product_lifetime: [],
    product_sdcm: []
  });
  const [activeFilters, setActiveFilters] = useState({
    product_color_temp: [],
    product_optical_angle: [],
    product_housing_color: [],
    product_reflector_color: [],
    product_control: [],
    product_color_extended: [],
    product_control_exntended: [],
    product_material: [],
    product_mounting: [],
    product_ip_rating: [],
    product_lifetime: [],
    product_sdcm: []
  });

  // Function to update available filter options
  const updateAvailableFilterOptions = (products) => {
    const newAvailableFilters = { ...availableFilters };
    
    // Reset all available filters
    Object.keys(newAvailableFilters).forEach(key => {
      newAvailableFilters[key] = [];
    });

    // Populate available filters based on current products
    products.forEach(product => {
      Object.keys(newAvailableFilters).forEach(key => {
        if (product[key] && !newAvailableFilters[key].includes(product[key])) {
          newAvailableFilters[key].push(product[key]);
        }
      });
    });

    setAvailableFilters(newAvailableFilters);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      } else {
        newFilters[filterType] = [...newFilters[filterType], value];
      }
      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      product_color_temp: [],
      product_optical_angle: [],
      product_housing_color: [],
      product_reflector_color: [],
      product_control: [],
      product_color_extended: [],
      product_control_exntended: [],
      product_material: [],
      product_mounting: [],
      product_ip_rating: [],
      product_lifetime: [],
      product_sdcm: []
    });
  };

  // Fetch lighting products when category_id and family_id are available
  useEffect(() => {
    if (category_id) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category_id}/products`)
        .then(response => {
          const products = response.data;
          setLightingProducts(products);
          
          // Initial filter based on family_id
          const initialFiltered = products.filter(product => product.product_family == family_id);
          setFilteredProducts(initialFiltered);
          
          // Initialize available filter options
          updateAvailableFilterOptions(initialFiltered);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [category_id, family_id]);

  // Apply filters whenever activeFilters changes
  useEffect(() => {
    if (lightingProducts.length > 0) {
      let filtered = lightingProducts.filter(product => product.product_family == family_id);
      
      // Apply active filters
      Object.entries(activeFilters).forEach(([key, values]) => {
        if (values.length > 0) {
          filtered = filtered.filter(product => values.includes(product[key]));
        }
      });
      
      setFilteredProducts(filtered);
      updateAvailableFilterOptions(filtered);
    }
  }, [activeFilters, lightingProducts, family_id]);

  const toggleFilters = () => setShowFilters(prev => !prev);

  // Helper function to render filter section with radio buttons
  const renderFilterSection = (title, filterType, options) => {
    // Only show filter section if there are options available
    if (!options || options.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="max-h-40 overflow-y-auto">
          {options.map((option) => {
            // Check if this option is selected
            const isSelected = activeFilters[filterType].includes(option);
            
            return (
              <div key={`${filterType}-${option}`} className="flex items-center mb-1">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    id={`${filterType}-${option}`}
                    className="mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 checked:border-blue-600 checked:bg-white"
                    checked={isSelected}
                    onChange={() => handleFilterChange(filterType, option)}
                  />
                  {isSelected && (
                    <div className="pointer-events-none absolute left-[4px] h-2 w-2 rounded-full bg-blue-600"></div>
                  )}
                </div>
                <label 
                  htmlFor={`${filterType}-${option}`} 
                  className={`ml-2 cursor-pointer ${isSelected ? 'font-medium text-blue-600' : 'text-gray-700'}`}
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button 
            onClick={clearAllFilters}
            className="text-sm text-blue-600 underline"
          >
            Clear All
          </button>
        </div>
        {renderFilterSection("Color Temperature", "product_color_temp", availableFilters.product_color_temp)}
        {renderFilterSection("Optical Angle", "product_optical_angle", availableFilters.product_optical_angle)}
        {renderFilterSection("Housing Color", "product_housing_color", availableFilters.product_housing_color)}
        {renderFilterSection("Reflector Color", "product_reflector_color", availableFilters.product_reflector_color)}
        {renderFilterSection("Control", "product_control", availableFilters.product_control)}
        {renderFilterSection("Extended Color", "product_color_extended", availableFilters.product_color_extended)}
        {renderFilterSection("Extended Control", "product_control_exntended", availableFilters.product_control_exntended)}
        {renderFilterSection("Material", "product_material", availableFilters.product_material)}
        {renderFilterSection("Mounting", "product_mounting", availableFilters.product_mounting)}
        {renderFilterSection("IP Rating", "product_ip_rating", availableFilters.product_ip_rating)}
        {renderFilterSection("Lifetime", "product_lifetime", availableFilters.product_lifetime)}
        {renderFilterSection("SDCM", "product_sdcm", availableFilters.product_sdcm)}
      </motion.aside>

      {/* Desktop Filters Sidebar */}
      <aside className="hidden lg:block w-full md:w-72 p-4 mt-12 lg:ml-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button 
            onClick={clearAllFilters}
            className="text-sm text-blue-600 underline"
          >
            Clear All
          </button>
        </div>
        {renderFilterSection("Color Temperature", "product_color_temp", availableFilters.product_color_temp)}
        {renderFilterSection("Optical Angle", "product_optical_angle", availableFilters.product_optical_angle)}
        {renderFilterSection("Housing Color", "product_housing_color", availableFilters.product_housing_color)}
        {renderFilterSection("Reflector Color", "product_reflector_color", availableFilters.product_reflector_color)}
        {renderFilterSection("Control", "product_control", availableFilters.product_control)}
        {renderFilterSection("Extended Color", "product_color_extended", availableFilters.product_color_extended)}
        {renderFilterSection("Extended Control", "product_control_exntended", availableFilters.product_control_exntended)}
        {renderFilterSection("Material", "product_material", availableFilters.product_material)}
        {renderFilterSection("Mounting", "product_mounting", availableFilters.product_mounting)}
        {renderFilterSection("IP Rating", "product_ip_rating", availableFilters.product_ip_rating)}
        {renderFilterSection("Lifetime", "product_lifetime", availableFilters.product_lifetime)}
        {renderFilterSection("SDCM", "product_sdcm", availableFilters.product_sdcm)}
      </aside>

      <h1 className="absolute top-0 left-10 lg:left-24 lg:text-5xl sm:text-4xl font-bold text-3xl">{family_name}</h1>
      <div className="hidden md:block w-px bg-black mx-4 relative mt-8"></div>

      {/* Lighting Products Grid */}
      <main className="w-full md:w-3/4 p-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">{filteredProducts.length} Results</p>
          {Object.values(activeFilters).some(arr => arr.length > 0) && (
            <button 
              onClick={clearAllFilters}
              className="text-sm text-blue-600 underline lg:hidden"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-2">
          {filteredProducts.map((product, index) => (
            <Link
              href={`/products/category/objects/item?product_name=${product.product_name}&family_name=${family_name}&product_family=${product.product_family}&product_id=${product.product_id}&category_id=${category_id}`}
              key={index}
            >
              <div className="p-1">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${product.product_name}.png` || '/assets/products/sample_bulb.png' }
                  alt={product.product_name}
                  className="w-50 aspect-square object-cover mb-2 border-2 border-solid border-black bg-gray-300 rounded-lg"
                />
                <h3 className="text-lg font-medium">{product.product_name}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products match your selected filters.</p>
            <button 
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}