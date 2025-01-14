import { useEffect } from "react";
import { X } from "lucide-react";
import useProjectsStore from "@store/projects";

export default function Filters({ filters }) {
  const {
    filters: selectedFilters,
    addFilter,
    removeFilter,
    setFilters,
    clearFilters,
  } = useProjectsStore();
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

  return (
    <div className="w-full flex flex-col gap-2 justify-start items-start text-nowrap text-sm sm:flex-row sm:items-center sm:gap-8">
      <h1>Filters:</h1>
      <div className="flex gap-8 items-center">
        <ul className="flex gap-8 justify-center items-center">
          {filters.map((filter, index) => (
            <li
              key={index}
              onClick={() => handleFilterSelection(filter)}
              className={`${isFilterSelected(filter) ? "text-black" : "text-gray-300"} relative group hover:cursor-pointer transition-colors duration-500`}
            >
              {filter}
              <span
                className={`${isFilterSelected(filter) ? "bg-black w-full" : "bg-gray-300 max-w-0 group-hover:max-w-full"} block transition-all duration-500 h-0.5`}
              ></span>
            </li>
          ))}
        </ul>
        <button
          className="disabled:text-gray-300 disabled:cursor-not-allowed transition duration-500"
          disabled={selectedFilters.length === 0}
          onClick={() => clearFilters()}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
