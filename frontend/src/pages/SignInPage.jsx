import { SignIn } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const SignInPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoaded } = useUser();

  // Determine role from navigation state
  const role = location.state?.role || "default";

  // useEffect(() => {
  //   if (isLoaded && user) {
  //     const userRole = user.unsafeMetadata.role;
  //     // Redirect based on the role selected during login
  //     if (role === 'admin' && userRole === 'admin') {
  //       navigate('/admin/dashboard');
  //     } else if (role === 'athlete' && userRole === 'athlete') {
  //       navigate('/athlete/dashboard');
  //     } else {
  //       // Fallback redirect or error handling
  //       navigate('/unauthorized');
  //     }
  //   }
  // }, [user, isLoaded, navigate, role]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-none border-none",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
            formFieldInput: "border rounded-md",
          },
        }}
        // Dynamically set afterSignInUrl based on selected role
        // afterSignInUrl={role === 'admin' ? '/admin/dashboard' : '/athlete/dashboard'}
        forceRedirectUrl="/"
      />
    </div>
  );
};

export default SignInPage;
