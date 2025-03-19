"use client"

import { useState } from 'react';
import { Mail, Phone, Fan as Fax, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

// interface OfficeDetails {
//   country: string;
//   flag: string;
//   address: string;
//   email: string;
//   phone: string;
//   fax: string;
// }

const offices = [
  {
    country: 'GERMANY',
    flag: 'https://flagcdn.com/w40/de.png',
    address: 'Lyte Master GmbH Auf Dem SchurweBel, 5A 53347 Alfter-Witterschlick Germany',
    email: 'info@lytemaster.com',
    phone: '+ 49 228 350638 0',
    fax: '+ 49 228 350638 38'
  },
  {
    country: 'KSA',
    flag: 'https://flagcdn.com/w40/sa.png',
    address: 'Lyte Master Lighting Co Ltd Office 06, Zein Tower Siteen Street, Al Malaz P.O Box 53072, Riyadh, Kingdom of Saudi Arabia',
    email: 'info@lytemaster.com',
    phone: '+966 11 47 70 704',
    fax: '+966 11 472 6040'
  },
  {
    country: 'UAE',
    flag: 'https://flagcdn.com/w40/ae.png',
    address: 'Lyte Master L.L.C Office 1101, Apricot Tower, Dubai Silicon Oasis, P.O Box 237150 Dubai, United Arab Emirates',
    email: 'info@lytemaster.com',
    phone: '+971 434 26 226',
    fax: '+971 434 26 229'
  }
];

function App() {
  const [openOffices, setOpenOffices] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const toggleOffice = (country) => {
    setOpenOffices(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen --bg-gray-100 mt-[100px]">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bolder text-black mb-12 text-center --bg-[red]">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 h-fit">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm p-3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-900 transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Company Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Head Office</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">
                    Lyte Master GmbH Auf Dem SchurweBel, 5A 53347 Alfter-Witterschlick Germany
                  </span>
                </div>

                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-gray-600" />
                  <a href="mailto:info@lytemaster.com" className="ml-3 text-gray-600 hover:text-gray-900">
                    info@lytemaster.com
                  </a>
                </div>

                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-gray-600" />
                  <a href="tel:+4922835063838" className="ml-3 text-gray-600 hover:text-gray-900">
                    +49 228 350638 38
                  </a>
                </div>

                <div className="flex items-center">
                  <Fax className="w-6 h-6 text-gray-600" />
                  <span className="ml-3 text-gray-600">+49 228 350638 38</span>
                </div>
              </div>
            </div>

            {/* Global Offices */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Global Offices</h2>
              <div className="space-y-6">
                {offices.map((office) => (
                  <div key={office.country} className="border-t first:border-t-0 pt-6 first:pt-0">
                    <button
                      onClick={() => toggleOffice(office.country)}
                      className="flex items-center justify-between w-full"
                    >
                      <div className="flex items-center">
                        <img 
                          src={office.flag} 
                          alt={`${office.country} flag`} 
                          className="w-8 h-auto mr-3"
                        />
                        <h3 className="text-xl font-semibold text-gray-900">{office.country}</h3>
                      </div>
                      {openOffices[office.country] ? (
                        <ChevronUp className="w-6 h-6 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-600" />
                      )}
                    </button>

                    {openOffices[office.country] && (
                      <div className="mt-4 space-y-3">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                          <span className="ml-3 text-gray-600">{office.address}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <a href={`mailto:${office.email}`} className="ml-3 text-gray-600 hover:text-gray-900">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <a href={`tel:${office.phone}`} className="ml-3 text-gray-600 hover:text-gray-900">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Fax className="w-5 h-5 text-gray-600" />
                          <span className="ml-3 text-gray-600">{office.fax}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;