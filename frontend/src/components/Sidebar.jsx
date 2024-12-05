import { Link, useLocation } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';
import { 
  Home, 
  User, 
  Settings, 
  FileText, 
  LogOut,
  BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: Home,
      roles: ['athlete', 'admin']
    },
    { 
      name: 'Profile', 
      path: '/profile', 
      icon: User,
      roles: ['athlete', 'admin']
    },
    { 
      name: 'Admin Controls', 
      path: '/admin', 
      icon: Settings,
      roles: ['admin']
    },
    { 
      name: 'Performance Form', 
      path: '/testing', 
      icon: BarChart3,
      roles: ['admin']
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: FileText,
      roles: ['admin']
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white border-r border-gray-200 shadow-md sticky top-0 z-50 w-64 h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex flex-col justify-between">
          {/* Logo Section */}
          <div className="py-4 border-b border-gray-200">
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
          </div>

          {/* Navigation Links */}
          <nav className="py-4 flex-grow">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-4 py-3 transition-colors 
                      ${isActive(item.path) 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600 font-medium'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sign Out Section */}
          <div className="py-4 border-t border-gray-200">
            <SignOutButton>
              <button className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;