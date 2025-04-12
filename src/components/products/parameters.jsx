import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Parameters({ setShowDownloads , setSelectedWattage ,parameterItems, loading}) {
  // const [parameterItems, setParameterItems] = useState([]);
 
  const searchParams = useSearchParams();
  const product_id = searchParams.get('product_id');



  return (
    <div className="mt-8 w-full lg:px-44 overflow-x-auto">
      <h2 className="text-2xl font-bold">Parameters</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : parameterItems.length > 0 ? (
        <table className="min-w-full border-collapse border-gray-200 rounded-lg text-sm my-4 overflow-x-auto">
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
            {parameterItems.map((item, index) => (
              <tr
                key={index}
                className="border-b border-black text-gray-500 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedWattage(item);
                  
                  setShowDownloads(true);
                  
                }} // Pass selected wattage to parent
              >
                <td className="py-4 px-4">{item.product_code}</td>
                <td className="py-4 px-4">{item.product_dimensions}</td>
                <td className="py-4 px-4">{item.product_cut_out}</td>
                <td className="py-4 px-4">{item.product_wattage}</td>
                <td className="py-4 px-4">{item.product_luminous_flux}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No data available</p>
      )}
    </div>
  );
}
