import { useState, useEffect } from "react";
// import backgroundImage from "../../public/assets/adr1.jpg";
const backgroundImage = "/assets/adr1.jpg";
import { SlArrowDownCircle } from "react-icons/sl";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after initial render
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToAthleteTools = () => {
    document.getElementById("athlete-tools").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const heroWords = [
    { word: "Integrity.", delay: "delay-100" },
    { word: "Transparency.", delay: "delay-300" },
    { word: "Trust.", delay: "delay-500" },
  ];

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Content Container */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Animated Hero Words */}
        <div className="space-y-4 mb-6">
          {heroWords.map((item, index) => (
            <h1
              key={index}
              className={`
                text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight 
                transform transition-all duration-1000 ease-out
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }
                ${item.delay}
              `}
            >
              {item.word}
            </h1>
          ))}
        </div>

        {/* Tagline */}
        <p
          className={`
            max-w-2xl mx-auto mb-8 text-lg md:text-xl text-gray-200
            transform transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
            delay-700
          `}
        >
          Creating a dope-free environment and promoting fair-play.
        </p>

        {/* Call to Action Buttons */}
        <div
          className={`
            flex justify-center space-x-4 mb-16
            transform transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
            delay-1000
          `}
        >
          <a
            href="#"
            className="
              px-6 py-3 
              bg-blue-600 text-white 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-offset-2
            "
          >
            Know More
          </a>
          <a
            href="#"
            className="
              px-6 py-3 
              bg-transparent 
              border-2 border-white 
              text-white 
              rounded-lg 
              hover:bg-white hover:text-black 
              transition-colors
              focus:outline-none 
              focus:ring-2 
              focus:ring-white 
              focus:ring-offset-2
            "
          >
            Get Started
          </a>
        </div>

        {/* Scroll Down Button */}
        <div
          className={`
            flex justify-center
            transform transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }
            delay-[1200ms]
          `}
        >
          <button
            onClick={scrollToAthleteTools}
            aria-label="Scroll to Athlete Tools"
            className="
              w-12 h-12 
              bg-blue-600 
              rounded-full 
              flex items-center justify-center
              hover:bg-blue-700 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:ring-offset-2
              animate-bounce
            "
          >
            <SlArrowDownCircle className="text-4xl text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
