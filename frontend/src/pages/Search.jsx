import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [countries, setCountries] = useState([]); // State for countries
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Load JSON data on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // const file =  "/assets/full_paths_proper.json";
        const res = await fetch('/assets/full_paths.json'); 
        if (!res.ok) {
          throw new Error('Failed to load country data');
        }
        const data = await  res.json();
      
        const countryList = data.data.getMetaData.countryCodes;
        setCountries(countryList);
      } catch (err) {
        console.error(err);
        setError("shiiit",err.message);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = async () => {
    if (!name && !country && !gender) {
      alert('Please provide at least one search parameter');
      return;
    }

    console.log("country: ",country);
    console.log("name: ",name);
    console.log("Gender: ",gender);
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (country) params.append('country', country);
      if (gender) params.append('gender', gender);

      const apiUrl = `http://localhost:5000/search-competitors?${params.toString()}`;
      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResponse(data);
      navigate(`/search/${data.id}`, { state: { jsonResponse: data } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Search</h1>
        <div className="space-y-6 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-blue-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Results:</h2>
            <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
