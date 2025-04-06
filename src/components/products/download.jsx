import React from 'react';

export default function Download({ datasheetLink} ) {
  // A simple inline SVG download icon (Heroicons)
  const DownloadIcon = (  ) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2
           M7 10l5 5 5-5
           M12 15V3"
      />
    </svg>
  );

  return (
    <div className="p-4  lg:ml-44 ">
      {/* Heading */}
      <h2 className="text-xl font-black mb-4 mx-5"></h2>

      {/* Download List */}
      <ul className="space-y-2 text-gray-700 text-xl">
        <a href="">
        <li className="flex items-center gap-2">
          <DownloadIcon />
          <u>IES Files</u>
        </li>
        </a>
        <a href={`${datasheetLink}`}>
        <li className="flex items-center gap-2">
          <DownloadIcon />
          <u>Datasheets</u>
        </li>
        </a>
        <li className="flex items-center gap-2">
          <DownloadIcon />
          <u>Insulation Instructions</u>
        </li>
        <li className="flex items-center gap-2">
          <DownloadIcon />
          <u>Images</u>
        </li>
        <li className="flex items-center gap-2">
          <DownloadIcon />
          <u>Test Certificates</u>
        </li>
      </ul>

      {/* Button */}
      <button className="mt-6 bg-black text-white px-4 py-2 rounded-md flex items-center gap-2">
        <DownloadIcon />
        Download Datasheet
      </button>
    </div>
  );
}
