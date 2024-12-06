import React, { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', address: '', message: '' });
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-900">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          filter: "brightness(0.3)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Contact Information */}
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-8">CONTACT US</h1>
            <p className="text-sm text-gray-400 mb-12">Images from Freepik</p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-300">1 (234) 567-891, 1 (234) 987-654</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-300">121 Rock Sreet, 21 Avenue, New York, NY 92103-9000</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-amber-500 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-300">Mon - Fri ..... 10 am - 8 pm, Sat, Sun ...... Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="mt-8 lg:mt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter a valid email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-0"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-transparent border-b border-gray-600 px-0 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-0 resize-none"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-md transition duration-200"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

