import { useState } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log(dropdownOpen);
  };

  return (
    <nav className="bg-white border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo and Anti-Doping Text */}
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://www.shutterstock.com/image-vector/anti-doping-vector-sign-logo-600nw-2321297661.jpg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Anti-Doping
          </span>
        </a>

        {/* Navigation Links and Buttons */}
        <div className="flex items-center space-x-8 rtl:space-x-reverse">
          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-8 rtl:space-x-reverse font-medium">
            <li>
              <a
                href="#"
                className="text-gray-900 hover:text-blue-700"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700">
                Resources
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700">
                TUE
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700">
                Testing
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700">
                News
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-900 hover:text-blue-700">
                Contact
              </a>
            </li>
          </ul>

          {/* Login Button */}
          <div className="relative">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              onClick={toggleDropdown}
            >
              Login
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 bg-gray-100 shadow-xl rounded-lg mt-2 py-2 px-2 z-10 text-black">
                <ul>
                  <li className="border-b border-gray-300">
                    <a
                      href="#"
                      className="block py-2 px-3 rounded hover:bg-gray-100"
                    >
                      Athletes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 rounded hover:bg-gray-100"
                    >
                      Doctor
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-cta"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-cta"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
