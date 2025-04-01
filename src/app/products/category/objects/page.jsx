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
  
  const [lightingProducts, setLightingProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // State for active filters - changed to store single selected value for each parameter
  const [activeFilters, setActiveFilters] = useState({
    product_color_temp: null,
    product_optical_angle: null,
    product_housing_color: null,
    product_reflector_color: null,
    product_control: null,
    product_color_extended: null,
    product_control_exntended: null,
    product_material: null,
    product_mounting: null,
    product_ip_rating: null,
    product_lifetime: null,
    product_sdcm: null
  });

  // State for available filter options based on current selection
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

  // Store the original full set of filter options
  const [originalFilterOptions, setOriginalFilterOptions] = useState({
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

  // Fetch lighting products when category_id is available
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
          const initialOptions = extractFilterOptions(initialFiltered);
          setAvailableFilters(initialOptions);
          setOriginalFilterOptions(initialOptions); // Save the original options
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  }, [category_id, family_id]);

  // Helper function to split comma-separated values and return an array
  const splitValues = (value) => {
    if (!value) return [];
    return value.toString().split(',').map(item => item.trim());
  };

  // Extract unique filter options from a set of products
  const extractFilterOptions = (products) => {
    const options = {
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
    };

    // Extract unique values for each filter from products
    products.forEach(product => {
      Object.keys(options).forEach(key => {
        if (product[key]) {
          const values = splitValues(product[key]);
          values.forEach(val => {
            if (!options[key].includes(val)) {
              options[key].push(val);
            }
          });
        }
      });
    });

    // Sort all options for better user experience
    Object.keys(options).forEach(key => {
      options[key].sort();
    });

    return options;
  };

  // Handle filter selection - modified for radio button behavior
  const handleFilterChange = (filterType, value) => {
    // Create new filters object - if clicking the active filter value, deselect it
    const newActiveFilters = { 
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? null : value
    };
    
    setActiveFilters(newActiveFilters);
    applyFilters(newActiveFilters);
  };

  // Apply filters to products - modified for single selection
  const applyFilters = (currentFilters) => {
    // Start with products filtered by family_id
    let filtered = lightingProducts.filter(product => product.product_family == family_id);
    
    // Apply each active filter
    Object.keys(currentFilters).forEach(filterType => {
      // Only apply filter if there's a selected value
      if (currentFilters[filterType]) {
        filtered = filtered.filter(product => {
          // If the product doesn't have this property, filter it out
          if (!product[filterType]) return false;
          
          // Split the product's value for this filter into an array
          const productValues = splitValues(product[filterType]);
          
          // Check if the selected filter value exists in the product's values for this type
          return productValues.includes(currentFilters[filterType]);
        });
      }
    });
    
    setFilteredProducts(filtered);
    
    // Update available options for other filters based on current selection,
    // but keep all options for the parameters that have a selection
    updateAvailableFilterOptionsWithActiveFilters(filtered, currentFilters);
  };

  // Update available filter options accounting for active filters
  const updateAvailableFilterOptionsWithActiveFilters = (filteredProducts, currentFilters) => {
    // Get filter options from currently filtered products
    const newAvailableFilters = extractFilterOptions(filteredProducts);
    
    // For each filter type, if it has a selection, use the original options
    // instead of the filtered options to ensure all options remain visible
    Object.keys(currentFilters).forEach(filterType => {
      if (currentFilters[filterType] !== null) {
        newAvailableFilters[filterType] = [...originalFilterOptions[filterType]];
      }
    });
    
    setAvailableFilters(newAvailableFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({
      product_color_temp: null,
      product_optical_angle: null,
      product_housing_color: null,
      product_reflector_color: null,
      product_control: null,
      product_color_extended: null,
      product_control_exntended: null,
      product_material: null,
      product_mounting: null,
      product_ip_rating: null,
      product_lifetime: null,
      product_sdcm: null
    });
    
    const initialFiltered = lightingProducts.filter(product => product.product_family == family_id);
    setFilteredProducts(initialFiltered);
    setAvailableFilters({...originalFilterOptions});
  };

  const toggleFilters = () => setShowFilters(prev => !prev);

  // Helper function to render filter section with visible selected state
  const renderFilterSection = (title, filterType, options) => {
    // Only show filter section if there are options available
    if (!options || options.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div className="max-h-40 overflow-y-auto">
          {options.map((option) => (
            <div key={`${filterType}-${option}`} className="flex items-center mb-1">
              <input 
                type="radio" 
                id={`${filterType}-${option}`}
                name={filterType}
                className="w-4 h-4 cursor-pointer accent-blue-600"
                checked={activeFilters[filterType] === option}
                onChange={() => handleFilterChange(filterType, option)}
              />
              <label 
                htmlFor={`${filterType}-${option}`} 
                className={`ml-2 cursor-pointer ${activeFilters[filterType] === option ? 'font-medium text-blue-600' : 'text-gray-700'}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row p-8 min-h-screen mt-44 relative">
      {/* Styles to ensure radio buttons show selected state properly across browsers */}
      <style jsx global>{`
        input[type="radio"] {
          appearance: auto;
          -webkit-appearance: auto;
        }
        
        /* Add visible styling for selected radio buttons */
        input[type="radio"]:checked {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        
        /* Ensure the radio button dot is visible */
        input[type="radio"]:checked:after {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: white;
          position: relative;
          left: 3px;
          top: 3px;
          display: block;
        }
      `}</style>
      
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
          {activeFilters && Object.values(activeFilters).some(val => val !== null) && (
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