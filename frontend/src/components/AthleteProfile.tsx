import React from 'react';
import AthletePerformance from './AthletePerformance';

const data = {
  values: [
    { event: '100m', event_date: '2012-08-05', position: 1, score: 9.63, score_unit: 'seconds' },
    { event: '100m', event_date: '2013-08-11', position: 2, score: 9.75, score_unit: 'seconds' },
    { event: '100m', event_date: '2014-09-01', position: 3, score: 9.9, score_unit: 'seconds' },
    { event: '200m', event_date: '2015-08-28', position: 1, score: 19.55, score_unit: 'seconds' },
    { event: '100m', event_date: '2016-08-14', position: 2, score: 9.8, score_unit: 'seconds' },
    { event: '100m', event_date: '2017-08-06', position: 1, score: 9.85, score_unit: 'seconds' },
    { event: '100m', event_date: '2018-08-12', position: 3, score: 9.95, score_unit: 'seconds' },
    { event: '400m', event_date: '2019-09-01', position: 1, score: 43.12, score_unit: 'seconds' },
    { event: '200m', event_date: '2020-08-20', position: 2, score: 19.77, score_unit: 'seconds' },
    { event: '100m', event_date: '2021-08-01', position: 1, score: 9.76, score_unit: 'seconds' },
    { event: '100m', event_date: '2022-08-15', position: 2, score: 9.82, score_unit: 'seconds' },
    { event: '200m', event_date: '2023-08-10', position: 3, score: 20.01, score_unit: 'seconds' },
    { event: '400m', event_date: '2024-09-05', position: 1, score: 43.45, score_unit: 'seconds' },
  ],
};


// Default athlete silhouette image
const DEFAULT_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23CBD5E1'%3E%3Cpath d='M100 0a100 100 0 1 0 100 100A100 100 0 0 0 100 0zm0 40a30 30 0 1 1-30 30 30 30 0 0 1 30-30zm0 145c-25 0-47-13-60-32a70 70 0 0 1 120 0c-13 19-35 32-60 32z'/%3E%3C/svg%3E";

const AthleteProfile = ({ athleteData }) => {
  // Check if athleteData is provided
  if (!athleteData) {
    return <div className="text-center text-red-500">No athlete data available</div>;
  }

  // Function to check if highest ranking is valid
  const isValidRanking = (ranking) => {
    // Check if ranking exists and is not null/undefined
    if (!ranking) return false;

    // Check if event and ranking are not empty, not 'N/A', and not just whitespace
    const isEventValid = ranking.event && 
      ranking.event.trim() !== '' && 
      ranking.event.toLowerCase() !== 'n/a';
    
    const isRankingValid = ranking.ranking && 
      ranking.ranking.trim() !== '' && 
      ranking.ranking.toLowerCase() !== 'n/a';

    return isEventValid && isRankingValid;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">{athleteData.name}</h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Image */}
          <div className="md:col-span-1 flex justify-center items-start">
            <img 
              src={athleteData.image_url || DEFAULT_IMAGE} 
              alt={`${athleteData.name} profile`} 
              onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE; }}
              className="w-full max-w-sm rounded-lg shadow-xl object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">
                  Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-600">Country</p>
                    <p className="text-xl">{athleteData.country}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Date of Birth</p>
                    <p className="text-xl">{athleteData.birth_info}</p>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">
                  Athletic Performance
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-gray-600">Events</p>
                    <ul className="text-xl list-disc pl-5">
                      {(athleteData.events || [athleteData.event]).map((event, index) => (
                        <li key={index}>{event}</li>
                      ))}
                    </ul>
                  </div>
                  {isValidRanking(athleteData.highest_event_ranking) && (
                    <div>
                      <p className="font-medium text-gray-600">Highest Ranking</p>
                      <p className="text-xl">
                        {athleteData.highest_event_ranking.event} - {athleteData.highest_event_ranking.ranking}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Honours */}
              <div>
                <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4">
                  Honours and Achievements
                </h2>
                {athleteData.honours && athleteData.honours.length > 0 ? (
                  <ul className="space-y-2">
                    {athleteData.honours.map((honour, index) => (
                      <li 
                        key={index} 
                        className="bg-blue-50 p-3 rounded-lg flex justify-between items-center"
                      >
                        <span className="text-lg font-medium">{honour.title}</span>
                        <span className="text-blue-600 font-bold">{honour.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">No honours recorded</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <AthletePerformance data={data} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Athlete Profile</p>
      </footer>
    </div>
  );
};

export default AthleteProfile;