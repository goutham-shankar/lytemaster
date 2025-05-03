"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heading } from "@components/common/text";
import CtaButton from "@components/common/ctaButton";

// Section heading with underline styling
const SectionTitle = ({ title }) => (
  <div className="w-full flex flex-col justify-start gap-2 mb-8">
    <h1 className="text-3xl sm:text-4xl font-bold uppercase">
      {title}
      <span className="block w-28 h-1 mt-1 bg-black" />
    </h1>
  </div>
);

// Project info
const ProjectDetailHeader = ({ project }) => (
  <section className="w-full mt-16 px-8 py-4 sm:px-16 sm:py-8 md:mt-20 lg:mt-28 text-black">
    <Heading title={project?.project_name || "Project Details"} />
    <div className="mt-4 flex flex-col gap-2 sm:w-1/2">
      <div className="flex gap-2">
        <span className="font-semibold">Location:</span>
        <span>{project?.Project_addr || "N/A"}</span>
      </div>
      <div className="flex gap-2">
        <span className="font-semibold">Category:</span>
        <span>{project?.Lighting_Type || "N/A"}</span>
      </div>
    </div>
  </section>
);

// Enhanced bento grid layout
const BentoGrid = ({ images = [] }) => {
  // Ensure we have at least empty placeholders if images count is low
  const safeImages = images.length > 0 ? images : ['placeholder.jpg', 'placeholder.jpg', 'placeholder.jpg'];
  
  // Helper function to determine image size and position
  const getImageSizeClass = (index) => {
    // Create bento-style patterns for different positions
    // Every 5th image (0-indexed) is large
    if (index % 5 === 0) return "col-span-2 row-span-2";
    // Every 3rd image is wide
    if (index % 3 === 0) return "col-span-2 row-span-1";
    // Every 7th image is tall
    if (index % 7 === 0) return "col-span-1 row-span-2";
    // Default size
    return "col-span-1 row-span-1";
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">
      {safeImages.map((img, index) => {
        const sizeClass = getImageSizeClass(index);
        
        return (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg bg-gray-100 group shadow-md hover:shadow-xl transition-shadow duration-300 ${sizeClass}`}
          >
            <img
              src={img === 'placeholder.jpg' 
                ? 'https://via.placeholder.com/800x450/eee/999?text=No+Image' 
                : `${process.env.NEXT_PUBLIC_BASE_URL}/project_image/${img}`}
              alt={`Project image ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark overlay gradient for text */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            
            {/* Location tag - positioned at top left */}
            <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm px-3 py-1 text-white text-xs rounded">
              {index % 2 === 0 ? 'UAE' : 'Port Rashid, UAE'}
            </div>
            
            {/* Title - positioned at bottom */}
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <h3 className="font-bold text-lg">
                DP World {index % 2 === 0 ? 'Hamriya Port' : ''}
              </h3>
              {/* Add description for larger cells */}
              {(sizeClass === "col-span-2 row-span-2" || sizeClass === "col-span-2 row-span-1") && (
                <p className="text-sm mt-1 text-gray-200 line-clamp-2">
                  High mast lighting installation with energy efficient LED fixtures
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function ProjectDetail() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${params.project_id}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.status}`);
        }

        const data = await response.json();
        setProject(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.project_id) fetchProjectDetails();
  }, [params.project_id]);

  const projectImages = project?.images
    ? project.images.split(",").map((img) => img.trim()).filter(Boolean)
    : [];

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-bold">Error Loading Project</h1>
        <p>{error}</p>
        <CtaButton href="/projects" name="Back to Projects" />
      </div>
    );
  }

  return (
    <>
      <ProjectDetailHeader project={project} />

      <section className="w-full px-8 py-8 sm:px-16 lg:py-12 flex flex-col items-start gap-8 text-black">
        <SectionTitle title="Highmast Lighting" />

        <div className="w-full">
          {projectImages.length > 0 ? (
            <BentoGrid images={projectImages} />
          ) : (
            <p className="text-center text-gray-500">No images available</p>
          )}
        </div>

        <div className="w-full flex justify-center mt-8">
          <CtaButton href="/projects" name="Back to Projects" />
        </div>
      </section>
    </>
  );
}