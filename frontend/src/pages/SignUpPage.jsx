import { SignUp } from "@clerk/clerk-react";
import { useLocation } from 'react-router-dom';

const SignUpPage = () => {
  const location = useLocation();
  const role = location.state?.role || 'default';

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              card: "shadow-lg rounded-lg"
            }
          }}
          unsafeMetadata={{
            role: role,
            termsAccepted: false  
          }}
          forceRedirectUrl="/"
        />
      </div>
    </div>
  );
};

export default SignUpPage;