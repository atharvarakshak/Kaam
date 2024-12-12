import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-4 relative">
      <div className="relative py-16 bg-gray-50 flex flex-col justify-center items-center">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 opacity-10 h-64 w-64 rounded-full blur-3xl transform scale-150 translate-x-1/4 -translate-y-1/4"></div>
        </div>
        <div className="relative z-10 text-center">
          {/* Animated Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-manrope text-5xl font-extrabold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent"
          >
            About Us!
          </motion.h2>
          {/* Subheading */}
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Learn more about our journey, mission, and the values that drive us
            forward.
          </p>
          {/* Decorative Line */}
          <div className="mt-6 flex justify-center">
            <span className="inline-block w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full"></span>
          </div>
        </div>

        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto flex flex-col justify-center items-center">
          <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-12">
            <div className="text-center">
              <h2 className="text-gray-500 text-4xl font-bold font-manrope leading-normal">
                Promoting Fair Play and Integrity
              </h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed mt-3">
                At the heart of our mission lies the commitment to ensure a fair
                and level playing field for athletes across all disciplines. We
                are dedicated to upholding the principles of integrity,
                transparency, and accountability in sports by combating the use
                of performance-enhancing substances. Through rigorous testing,
                educational programs, and collaborative partnerships with
                organizations worldwide, we strive to foster a culture of clean
                and ethical competition.
              </p>
            </div>
            <button className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] flex justify-center items-center">
              <span className="px-1.5 text-white text-sm font-medium leading-6">
                Read More
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;