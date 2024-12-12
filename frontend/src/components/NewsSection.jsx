import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    date: "Jan 01, 2023",
    title: "Kayden Minear joins Monster Energy Star Racing Yamaha",
    description:
      "17-year-old Western Australian Kayden Minear has signed with Monster Energy Star Racing Yamaha for 2025.",
    image:
      "https://www.mcnews.com.au/wp-content/uploads/2024/08/FMST-MX2-Race-2-Round-8-ProMX-Championship-QMP-1913.jpg",
    url: "https://www.mcnews.com.au/moto-news-wsx-smx-dirt-track-rally-speedway/",
  },
  {
    id: 2,
    date: "Feb 01, 2023",
    title: "Don Madge Accepts Sanction for Violation of PFL Anti-Doping Policy",
    description:
      "USADA announced today that Don Madge, of South Africa, has accepted a two-year sanction for a violation of the Professional Fighters League (PFL) Anti-Doping Policy.",
    image: "https://www.usada.org/wp-content/uploads/PFL-post2.jpg",
    url: "https://www.usada.org/sanction/don-madge-accepts-doping-sanction/",
  },
  {
    id: 3,
    date: "Mar 15, 2023",
    title:
      "Ski and Snowboard Athlete Nicholas Pierce Accepts Sanction for Anti-Doping Rule Violation",
    description:
      "USADA announced today that Nicholas Pierce, of Virginia Beach, Va., an athlete in the sport of ski and snowboard, has accepted a three-year suspension for an anti-doping rule violation involving his possession",
    image:
      "https://www.usada.org/wp-content/uploads/Paralympic-Snowboarding.jpg",
    url: "https://www.usada.org/sanction/nicholas-pierce-accepts-doping-sanction/",
  },
  {
    id: 4,
    date: "September 13, 2024",
    title: "Narrow Review Denies Justice to Athletes",
    description:
      "Mr. Cottier repeatedly indicated the Cottier Report was narrow, did not address the merits, and was a far cry from seeking justice.",
    image:
      "https://www.usada.org/wp-content/uploads/2024-usada-registered-logo-600x400-1.jpg",
    url: "https://www.usada.org/announcement/narrow-review-denies-justice/",
  },

  {
    id: 5,
    date: "Jan 01, 2023",
    title: "Kayden Minear joins Monster Energy Star Racing Yamaha",
    description:
      "17-year-old Western Australian Kayden Minear has signed with Monster Energy Star Racing Yamaha for 2025.",
    image:
      "https://www.mcnews.com.au/wp-content/uploads/2024/08/FMST-MX2-Race-2-Round-8-ProMX-Championship-QMP-1913.jpg",
    url: "https://www.mcnews.com.au/moto-news-wsx-smx-dirt-track-rally-speedway/",
  },
  {
    id: 6,
    date: "Feb 01, 2023",
    title: "Don Madge Accepts Sanction for Violation of PFL Anti-Doping Policy",
    description:
      "USADA announced today that Don Madge, of South Africa, has accepted a two-year sanction for a violation of the Professional Fighters League (PFL) Anti-Doping Policy.",
    image: "https://www.usada.org/wp-content/uploads/PFL-post2.jpg",
    url: "https://www.usada.org/sanction/don-madge-accepts-doping-sanction/",
  },
];

const NewsSectionOptional = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerSlide < newsData.length
        ? prevIndex + itemsPerSlide
        : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerSlide >= 0 ? prevIndex - itemsPerSlide : 0
    );
  };

  const visibleNews = newsData.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Latest News
          <motion.p
            className="text-lg text-gray-500 mb-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Stay informed about the latest developments in doping and
            anti-doping efforts.
          </motion.p>
        </motion.h2>

        <div className="relative">
          <button
            onClick={handlePrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            } p-2 rounded-full bg-white shadow-md`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-8 h-8 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 ${
              currentIndex + itemsPerSlide >= newsData.length
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            } p-2 rounded-full bg-white shadow-md`}
            disabled={currentIndex + itemsPerSlide >= newsData.length}
          >
            <ChevronRight className="w-8 h-8 text-gray-700" />
          </button>

          <div className="flex space-x-6 overflow-hidden">
            {visibleNews.map((news) => (
              <motion.div
                key={news.id}
                className="flex-shrink-0 w-full max-w-md group border-gray-300 transition-transform duration-300 hover:-translate-y-2 bg-blue-600 p-4 rounded-lg text-white border-2 border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="rounded-t-2xl w-full h-40 object-cover"
                  />
                </div>
                <div className="p-3 lg:p-4 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                  <span className="font-medium mb-2 block group-hover:text-blue-600">
                    {news.date}
                  </span>
                  <h4 className="text-lg font-medium leading-6 mb-4 group-hover:text-blue-600">
                    {news.title}
                  </h4>
                  <p className="leading-5 mb-6 group-hover:text-blue-600">
                    {news.description}
                  </p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-base font-semibold group-hover:text-blue-600 transition-colors"
                  >
                    Click here
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSectionOptional;