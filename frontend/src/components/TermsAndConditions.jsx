import React, { useState } from 'react';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, X } from 'lucide-react';

function TermsAndConditions({ redirectTo = '/' }) {
  const [accepted, setAccepted] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setAccepted(!accepted);
  };

  const handleSubmit = async () => {
    if (accepted) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            termsAccepted: true
          }
        });
        navigate(redirectTo);
      } catch (error) {
        console.error('Failed to update user metadata:', error);
        alert('Failed to accept terms. Please try again.');
      }
    } else {
      alert('Please accept the terms and conditions.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl mx-4 rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ShieldCheck size={24} />
            <h2 className="text-xl font-bold">Anti-Doping Compliance Agreement</h2>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="hover:bg-red-700 p-1 rounded-full"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Important Terms and Conditions</h3>
          
          <div className="space-y-4 text-gray-700">
            <section>
              <h4 className="font-bold mb-2">Athlete's Commitment</h4>
              <p>As an athlete, you are responsible for:</p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Ensuring no prohibited substances are present in your body</li>
                <li>Maintaining full accountability for any substance found during testing</li>
                <li>Cooperating completely with anti-doping authorities</li>
              </ul>
            </section>

            <section>
              <h4 className="font-bold mb-2">Prohibited Substances</h4>
              <p>The following are strictly forbidden:</p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Performance-enhancing drugs</li>
                <li>Anabolic steroids</li>
                <li>Hormone and metabolic modulators</li>
                <li>Stimulants and diuretics</li>
              </ul>
            </section>

            <section>
              <h4 className="font-bold mb-2">Consequences of Violation</h4>
              <p>Breaching anti-doping regulations may result in:</p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Immediate disqualification</li>
                <li>Suspension from competitions</li>
                <li>Multi-year or lifetime bans</li>
                <li>Potential legal and financial penalties</li>
              </ul>
            </section>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-4">
              <p className="text-sm text-yellow-800">
                Full compliance with WADA, USADA, and national anti-doping regulations is mandatory.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 flex items-center">
          <input
            type="checkbox"
            id="termsCheckbox"
            className="mr-3 h-5 w-5 text-red-600 focus:ring-red-500"
            checked={accepted}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="termsCheckbox" className="text-gray-700 flex-grow">
            I have read, understood, and agree to abide by these anti-doping terms and conditions
          </label>
          
          <button
            onClick={handleSubmit}
            disabled={!accepted}
            className={`ml-4 px-6 py-2 rounded-lg text-white font-bold ${
              accepted 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
