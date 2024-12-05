import { Navigate, Outlet } from 'react-router-dom';
import { 
  ClerkProvider, 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn, 
  useUser 
} from '@clerk/clerk-react';

// General Protected Route (Ensures user is logged in)
export const ProtectedRoute = () => {
  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Role-Based Protected Route
export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { user } = useUser();
  const userRole = user?.unsafeMetadata?.role;

  return (
    <>
      <SignedIn>
        {allowedRoles.includes(userRole) ? (
          <Outlet />
        ) : (
          <Navigate to="/unauthorized" replace />
        )}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

// Unauthorized Page Component
export const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Unauthorized Access</h2>
        <p className="text-gray-600">You do not have permission to access this page.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};