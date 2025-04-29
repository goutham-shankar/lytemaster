"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Heading, Paragraph } from "@components/common/text";
import CtaButton from "@components/common/ctaButton";

const SectionTitle = ({ title }) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <h1 className="w-min text-xl text-left font-bold text-nowrap sm:text-2xl lg:text-3xl xl:text-4xl">
        {title}
        <span className="block w-1/3 h-0.5 mt-1 bg-black"></span>
      </h1>
    </div>
  );
};

const ProjectDetailHeader = ({ project }) => {
  return (
    <section className="w-full h-max mt-16 px-8 py-4 flex flex-col justify-center items-left gap-4 text-black sm:px-16 sm:py-8 sm:gap-6 md:mt-20 lg:gap-8 lg:mt-28 xl:gap-12">
      <Heading title={project?.project_name || "Project Details"} />
      <div className="flex flex-col gap-2 sm:w-1/2">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Location:</span>
          <span>{project?.Project_addr || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Category:</span>
          <span>{project?.Lighting_Type || "N/A"}</span>
        </div>
      </div>
    </section>
  );
};

const ImageGrid = ({ images = [] }) => {
  // Define common grid layouts for different image counts
  const getGridClass = (index, total) => {
    // Default class for all images
    let baseClass = "rounded-lg overflow-hidden";
    
    // Height classes - adjust these values as needed
    const singleImageHeight = "h-96";       // For single image
    const featuredImageHeight = "h-96";     // For featured/main images
    const smallImageHeight = "h-48 sm:h-64"; // For secondary images
    
    // Different layouts based on total number of images
    if (total === 1) {
      return `${baseClass} col-span-3 ${singleImageHeight}`;
    } else if (total === 2) {
      return `${baseClass} col-span-3 sm:col-span-1 ${featuredImageHeight}`;
    } else if (total <= 4) {
      // For 3-4 images, alternate larger/smaller
      return index === 0 
        ? `${baseClass} col-span-3 sm:col-span-2 ${featuredImageHeight}` 
        : `${baseClass} col-span-3 sm:col-span-1 ${smallImageHeight}`;
    } else {
      // For 5+ images, make first one larger
      if (index === 0) {
        return `${baseClass} col-span-3 sm:col-span-2 ${featuredImageHeight}`;
      } else if (index < 5) {
        return `${baseClass} col-span-3 sm:col-span-1 ${smallImageHeight}`;
      } else {
        return `${baseClass} col-span-3 sm:col-span-1 ${smallImageHeight}`;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {images.map((image, index) => (
        <div key={index} className={getGridClass(index, images.length)} style={{ position: 'relative' }}>
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/project_image/${image}`}
            alt={`Project image ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
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
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${params.project_id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch project with status: ${response.status}`);
        }
        
        const data = await response.json();
        setProject(data[0]);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.project_id) {
      fetchProjectDetails();
    }
  }, [params.project_id]);

  // Parse images from comma-separated string
  const projectImages = project?.images ? project.images.split(',').filter(Boolean) : [];

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
      
      <section className="w-full px-8 py-8 flex flex-col justify-center items-center gap-6 text-black sm:px-16 lg:py-12">
        <SectionTitle title="Project Gallery" />
        
        <div className="w-full">
          {projectImages.length > 0 ? (
            <ImageGrid images={projectImages} />
          ) : (
            <p className="text-center text-gray-500">No images available for this project</p>
          )}
        </div>
        
        <div className="w-full flex justify-center mt-8">
          <CtaButton href="/projects" name="Back to Projects" />
        </div>
      </section>
    </>
  );
}