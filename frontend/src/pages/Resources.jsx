import React from "react";
import { FaSearch, FaRegCheckCircle, FaFileAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Resources = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
     

      {/* Hero Section */}
      <div className="relative w-full h-80 bg-gray-800 text-white flex items-center justify-center overflow-hidden">
        <img
          src="/assets/NoDopi .jpg"
          alt="No Doping"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
        {/* Optional overlay */}
        <h1 className="relative text-8xl font-bold z-10">Resources</h1>
      </div>

      {/* Main Content Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Doping</h2>
            <p className="text-gray-700 mb-4">
              the use of a substance (such as an anabolic steroid or
              erythropoietin) or technique (such as blood doping) to illegally
              improve athletic performance
            </p>
            <h2 className="text-3xl font-bold mt-8 mb-4">Anti-Doping</h2>
            <p className="text-gray-700 mb-6">
              Protecting clean athletes’ rights by detecting and deterring the
              use of dangerous, banned performance-enhancing substances and
              methods in doping test. We rely on and expect athletes to embrace
              anti-doping responsibilities to ensure the protection of clean
              competition.
            </p>
            <a
              href="#"
              className="inline-block text-blue-600 hover:underline font-medium"
            >
              Learn More
            </a>
          </div>
          <div>
            <iframe
              className="w-full h-72 border rounded-lg"
              src="https://www.youtube.com/embed/9y1VYw5LWDc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Prohibited Drugs Section */}
      <section className="py-12 bg-gray-100 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center lg:text-left">
            Prohibited Enhancement Drugs (PEDs)
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white shadow-md rounded-lg border border-gray-200 p-6">
            {/* Left Content */}
            <div>
              <ul className="list-disc pl-6 space-y-4 text-gray-700">
                <li>Drugs and methods enhancing performance are prohibited.</li>
                <li>Masking agents are included in the prohibited list.</li>
                <li>
                  Categories include:
                  <ol className="list-decimal pl-4 mt-2">
                    <li>Substances prohibited at all times</li>
                    <li>Substances prohibited in competition</li>
                    <li>Substances prohibited in specific sports</li>
                  </ol>
                </li>
              </ul>
              <a
                href="#"
                className="inline-block text-blue-600 hover:underline mt-4 font-medium"
              >
                Explore More
              </a>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                src="/assets/drugs1.jpg"
                alt="Prohibited Drugs"
                className="rounded-lg shadow-lg max-w-full h-72 border border-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TUE Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side: Image */}
            <div>
              <img
                src="/assets/TUE2.jpg"
                alt="Therapeutic Use Exemption"
                className="rounded-lg shadow-lg max-w-full max-h-[420px] pl-24"
              />
            </div>
            {/* Right side: Content */}
            <div>
              <h1 className="text-3xl font-bold mb-8">
                Therapeutic Use Exemption (TUE)
              </h1>
              <ul className="list-disc pl-6 space-y-4 text-gray-700">
                <li>
                  A Therapeutic Use Exemption (TUE) is an official medical
                  document giving an athlete permission to take a medication
                  that is ordinarily prohibited for the treatment of a
                  legitimate condition. It is only valid for a given period of
                  time.
                </li>
                <li>
                  It is a documented medical file approved by a TUE Committee
                  accepting that there is a legitimate need to take medication
                  and no equal alternative available.
                </li>
                <li>
                  It permits the athlete to take the defined medication while
                  competing without them registering a doping offence.
                </li>
                <li>
                  The use of TUEs is carefully monitored to avoid any abuse or
                  manipulation.
                </li>
              </ul>
              <a
                href="#"
                className="inline-block text-blue-600 hover:underline mt-4 font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-12 bg-gray-100 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              icon={<FaFileAlt className="text-blue-500 text-4xl" />}
              title="TUE Process"
              links={["Apply for TUE", "Renew your TUE", "TUE Pre-Check"]}
            />
            <Card
              icon={<FaSearch className="text-blue-500 text-4xl" />}
              title="Drug Reference"
              links={["Prohibited List", "Read More"]}
            />
            <Card
              icon={<FaRegCheckCircle className="text-blue-500 text-4xl" />}
              title="Resources"
              links={["TUE FAQs", "TUE Policy"]}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Card = ({ icon, title, links }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
        {title}
      </h3>
      <div className="space-y-2">
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className="block text-blue-600 hover:underline text-center"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Resources;
