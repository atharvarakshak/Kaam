import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [registerDropdownOpen, setRegisterDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const navLinks = [
    { label: "Home", path: "/" },
    // { label: "About", path: "/about" },
    { label: "Resources", path: "/resources" },
    { label: "Search", path: "/search" },
    { label: "DrugTest", path: "/drugtest" },
    { label: "Testing", path: "/testing" },
    // { label: "News", path: "/news" },
    { label: "Contact", path: "/contact" }
  ];

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    // Close register dropdown when login dropdown opens
    setRegisterDropdownOpen(false);
  };

  const toggleRegisterDropdown = () => {
    setRegisterDropdownOpen(!registerDropdownOpen);
    // Close login dropdown when register dropdown opens
    setDropdownOpen(false);
  };

  const handleRoleLogin = (role) => {
    // Close dropdown
    setDropdownOpen(false);
    
    // Navigate to sign-in with role
    navigate('/sign-in', { state: { role } });
  };

  const handleRoleRegister = (role) => {
    // Close dropdown
    setRegisterDropdownOpen(false);
    
    // Navigate to sign-up with role
    navigate('/sign-up', { state: { role } });
  };

  const navigateToDashboard = () => {
    // Get the role from user's unsafeMetadata
    const role = user?.unsafeMetadata?.role;

    switch(role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'doctor':
        navigate('/doctor/dashboard');
        break;
      case 'athlete':
        navigate('/athlete/dashboard');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            aria-label="Anti-Doping Home"
          >
            <img
              src="https://www.shutterstock.com/image-vector/anti-doping-vector-sign-logo-600nw-2321297661.jpg"
              alt="Anti-Doping Logo"
              className="h-8 w-8 group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              Anti-Doping
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Authentication Controls */}
            <SignedOut>
              <div className="flex space-x-4">
                {/* Login Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleLoginDropdown}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => handleRoleLogin('athlete')}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Athletes
                        </button>
                        <button
                          onClick={() => handleRoleLogin('admin')}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Admins
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Register Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleRegisterDropdown}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </button>
                  {registerDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => handleRoleRegister('athlete')}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          As Athlete
                        </button>
                        <button
                          onClick={() => handleRoleRegister('admin')}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          As Admin
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center space-x-4">
                <button
                  onClick={navigateToDashboard}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  My Dashboard
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <SignedIn>
              <div className="flex items-center space-x-4">
                <button
                  onClick={navigateToDashboard}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Dashboard
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            
            <button
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg ml-4"
              aria-label="Toggle mobile menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-700 hover:bg-blue-100 hover:text-blue-600 block px-3 py-2 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
              
              <SignedOut>
                <div className="border-t border-gray-200 pt-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleRoleLogin('athlete')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => handleRoleRegister('athlete')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Register
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => handleRoleLogin('admin')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Login as Admin
                      </button>
                      <button
                        onClick={() => handleRoleRegister('admin')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Register as Admin
                      </button>
                    </div>
                  </div>
                </div>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;