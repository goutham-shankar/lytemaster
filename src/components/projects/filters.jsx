import { useEffect, useState } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import useProjectsStore from "@store/projects";

export default function Filters({ filters }) {
  const {
    filters: selectedFilters,
    addFilter,
    removeFilter,
    setFilters,
    clearFilters,
  } = useProjectsStore();
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const isFilterSelected = (filter) =>
    selectedFilters.includes(filter.toLowerCase());
    
  const handleFilterSelection = (filter) => {
    if (isFilterSelected(filter)) {
      removeFilter(filter);
    } else {
      addFilter(filter);
    }
  };
  
  useEffect(() => {
    setFilters(filters);
  }, [filters]);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="--px-4 mx-[auto] --mx-[45px] w-[90%] --px-4 py-2 md:p-6 --bg-red-200 w-full  mt-16    sm:px-16 sm:py-8 sm:gap-6 md:mt-20 lg:gap-8 lg:mt-28 xl:gap-12">
      {/* Desktop View - Always visible on larger screens */}
      <div className="hidden md:flex md:flex-col md:gap-4 md:w-full">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-lg font-medium">Filters:</h1>
          <button
            className="disabled:text-gray-300 disabled:cursor-not-allowed transition duration-500"
            disabled={selectedFilters.length === 0}
            onClick={() => clearFilters()}
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="w-full">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 justify-start items-center">
            {filters.map((filter, index) => (
              <li
                key={index}
                onClick={() => handleFilterSelection(filter)}
                className={`${isFilterSelected(filter) ? "text-black" : "text-gray-300"} 
                  relative group hover:cursor-pointer transition-colors duration-500 text-base`}
              >
                {filter}
                <span
                  className={`${isFilterSelected(filter) ? "bg-black w-full" : "bg-gray-300 max-w-0 group-hover:max-w-full"} 
                    block transition-all duration-500 h-0.5`}
                ></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Mobile View - Click to expand filter dropdown */}
      <div className="md:hidden w-full">
        <button 
          onClick={toggleFilters}
          className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} />
            <span className="font-medium">Filters</span>
            {selectedFilters.length > 0 && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                {selectedFilters.length}
              </span>
            )}
          </div>
          {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isFilterOpen && (
          <div className="mt-2 p-4 bg-white rounded-lg shadow-md border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Select Filters</h2>
              <button
                className="disabled:text-gray-300 disabled:cursor-not-allowed transition duration-500"
                disabled={selectedFilters.length === 0}
                onClick={() => clearFilters()}
              >
                <X size={16} />
              </button>
            </div>
            
            <ul className="flex flex-col gap-y-3">
              {filters.map((filter, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterSelection(filter)}
                  className={`${isFilterSelected(filter) ? "text-black font-medium" : "text-gray-500"} 
                    relative py-1 hover:cursor-pointer transition-colors duration-300`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-sm border ${isFilterSelected(filter) ? "bg-black border-black" : "border-gray-300"} flex items-center justify-center`}>
                      {isFilterSelected(filter) && <span className="text-white text-xs">✓</span>}
                    </div>
                    {filter}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}