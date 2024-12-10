import React, { useState } from 'react';

const Search = () => {
  const [name, setName] = useState(''); // State for name
  const [country, setCountry] = useState(''); // State for country
  const [gender, setGender] = useState(''); // State for gender
  const [response, setResponse] = useState(null); // State for the API response
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleSearch = async () => {
    if (!name && !country && !gender) {
      alert('Please provide at least one search parameter');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Construct query string based on provided inputs
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (country) params.append('country', country);
      if (gender) params.append('gender', gender);

      // Replace this URL with your actual API endpoint
      const apiUrl = `https://api.example.com/search?${params.toString()}`;

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResponse(data); // Set API response
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
      {/* Input for Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Dropdowns */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
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

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </div>

    {/* Loading and Error Messages */}
    {loading && <p className="text-blue-500 text-center">Loading...</p>}
    {error && <p className="text-red-500 text-center">Error: {error}</p>}

    {/* Response Section */}
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
