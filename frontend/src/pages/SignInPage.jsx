import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AthleteProfile from '../components/AthleteProfile';

const SearchResult = () => {
  const location = useLocation();
  const { country, id } = useParams(); // Extract the dynamic 'id' from the URL path
  const { jsonResponse } = location.state || {}; // Get JSON response from state
  const [athleteData, setAthleteData] = useState(null); // State to store athlete data
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(null); // State to track any errors

  useEffect(() => {
    // Function to fetch athlete data from the backend
    const fetchAthleteData = async () => {
      if (!id || !country) {
        console.log("f");
        setError("No ID provided.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/athlete-data/${country}/${id}`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch athlete data');
        }

        const data = await res.json();
        setAthleteData(data); // Store the fetched data in state

        // Log athlete_code from the response
        console.log('Athlete Code:', data.athlete_code);
      } catch (err) {
        setError(err.message); // Set the error state if there's an issue
        console.error('Error fetching athlete data:', err);
      } finally {
        setLoading(false); // Stop loading when the request finishes
      }
    };

    fetchAthleteData(); // Call the function to fetch data on component mount
  }, [id]); // The effect runs whenever 'id' changes

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Search Results</h1>


        {/* Display the athlete data if available */}
        {loading && <p className="text-blue-500 text-center">Loading athlete data...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {athleteData && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Athlete Data</h2>
            <AthleteProfile athleteData={athleteData}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;