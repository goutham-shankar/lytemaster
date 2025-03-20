import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("/about_us_head.png")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <h1 className="text-5xl font-bold text-white">About Lyte Master</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lyte Master is all about manufacturing Industrial and Commercial LED Lights and its components by following all aspects of the environment. Our company is dedicated to the development of sustainable semiconductor lighting products and solutions, we provide the next generation LED lighting solutions that are Energy-Efficient, Eco-friendly, Economical and at the same time; Stylish.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Lyte Master is ISO certified manufacturer along with CE and Rohs and TUV Compliance, and targeting to be UL, and PSE Certified. We stand way ahead in delivering quality products and solutions for different applications that meet and exceed our customers expectation.
            </p>
          </div>
          <div>
            <img 
              src="/about_us.png" 
              alt="LED Manufacturing" 
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* What We Do Section */}
        <div className="--bg-white rounded-xl --shadow-lg --p-12 mb-20">
          <h2 className="text-4xl font-extrabold text-black mb-8">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-[300px] group overflow-hidden rounded-lg">
              <img 
                src="/assets/products/commercial-lighting-thumbnail.jpeg" 
                alt="Commercial Lighting" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Commercial Solutions</h3>
              </div>
            </div>
            <div className="relative h-[300px] group overflow-hidden rounded-lg">
              <img 
                src="/assets/products/industrial-lighting-thumbnail.jpeg" 
                alt="Industrial Lighting" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Industrial Lighting</h3>
              </div>
            </div>
            <div className="relative h-[300px] group overflow-hidden rounded-lg">
              <img 
                src="/assets/products/landscape-lighting-thumbnail.jpeg" 
                alt="Residential Lighting" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Residential Solutions</h3>
              </div>
            </div>
          </div>
          <div className="mt-8 text-lg text-gray-700 leading-relaxed">
            <p>
              We are your one-stop Solutions for lighting for homes, hallways, classrooms, living area, gymnasiums, theatres, and more. We always deliver standard products that are sure to meet the expectations of the customers both in terms of performance and in terms of the design.
            </p>
            <p className="mt-4">
              Quality and innovation are those two things that we never compromise on and will never compromise on. We are the leading service provides for Interior and exterior lighting for warehouses, offices, godowns, storefronts, restaurants, and warehouses. Lyte Master means Quality and Innovation.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <h2 className="text-3xl font-bold text-black mb-6">Vision</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              "Enlightening Tomorrow," is an invitation to embark on a journey of exploration, creativity, and sustainability. Together, we can transform the way the world experiences light, making it not just an essential element of life but also a source of beauty, efficiency, and inspiration.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-12">
            <h2 className="text-3xl font-bold text-black mb-6">Mission</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to actively pursue and bring to life our vision of "Enlightening Tomorrow." We are dedicated to transforming this vision into a tangible reality by fostering innovation, sustainability, and a deep appreciation for the profound impact of light on our lives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;