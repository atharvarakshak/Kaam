import { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const { isLoaded, signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode
      });

      if (completeSignUp.status === 'complete') {
        // Check user's role and set active session
        await setActive({ session: completeSignUp.createdSessionId });
        
        // Redirect based on role
        const userRole = completeSignUp.unsafeMetadata.role;
        if (userRole === 'admin') {
          navigate('/admin/dashboard');
        } else if (userRole === 'athlete') {
          navigate('/athlete/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.errors[0].message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Verification Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;