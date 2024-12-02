import backgroundImage from "../../public/assets/adr1.jpg";
import { SlArrowDownCircle } from 'react-icons/sl'; 

const HeroSection = () => {
  const scrollToAthleteTools = () => {
    document.getElementById("athlete-tools").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed', 
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 -mt-5">
        <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl">
          Integrity.
        </h1>
        <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl">
          Transparency.
        </h1>
        <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl">
          Trust.
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-200 lg:mb-8 md:text-lg lg:text-xl">
          Creating a dope-free environment and promoting fair-play.
        </p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        >
          Know more
        </a>

        {/* Flex container to align buttons */}
        <div className="flex justify-center mt-56">
          {/* Scroll Down Button with Bounce Effect */}
          <button
            onClick={scrollToAthleteTools}
            className="w-[46px] h-[46px] bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none transition duration-300 animate-bounce"
          >
            <SlArrowDownCircle className="text-5xl text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
