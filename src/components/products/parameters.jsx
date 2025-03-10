import React from 'react'

export default function () {
        const parameters = [
          { model: 'LM-022-DLZ3L*-12W', dimension: '93X85', cutout: '78', power: '12W', flux: '1020lm' },
          { model: 'LM-022-DLZ3L*-15W', dimension: '108X85', cutout: '100', power: '15W', flux: '1275lm' },
          { model: 'LM-022-DLZ3L*-20W', dimension: '120X102', cutout: '110', power: '20W', flux: '1700lm' },
          { model: 'LM-022-DLZ3L*-30W', dimension: '140X120', cutout: '125', power: '30W', flux: '2550lm' },
          { model: 'LM-022-DLZ3L*-40W', dimension: '160X117', cutout: '150', power: '40W', flux: '3400lm' },
        ];
  return (
         <div className="mt-8 w-full lg:px-44 overflow-x-auto">
         <h2 className="text-2xl font-bold">Parameters</h2>
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
             {parameters.map((item, index) => (
               <tr key={index} className="border-b border-black text-gray-500 text-center">
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
  )
}
