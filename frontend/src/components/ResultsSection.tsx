import React from 'react';

const ResultsSection = ({ results, onReset }) => {
  const { text = 'No text extracted', found_substances = [] } = results || {};

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl text-blue-600 font-semibold">Analysis Results</h2>
      </div>

      <div className="mb-6">
        <h3 className="text-xl text-gray-800">Extracted Text:</h3>
        <p
          className="p-4 bg-gray-100 rounded-lg text-gray-700 max-h-48 overflow-y-auto"
          style={{ maxHeight: '200px' }}
        >
          {text || 'No text extracted'}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl text-gray-800">Detected Substances:</h3>
        {found_substances.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-4">
            {found_substances.map((substance, index) => (
              <span
                key={index}
                className="px-4 py-1 border border-secondary-500 text-secondary-500 rounded-full text-sm"
              >
                {substance}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-gray-500">No banned substances detected</p>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all"
        >
          Upload Another Image
        </button>
      </div>
    </div>
  );
};

export default ResultsSection;
