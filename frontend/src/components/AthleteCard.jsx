import React from "react";

const AthleteCard = ({ athlete }) => {
  const { familyName, givenName, gender, birthDate, disciplines, urlSlug, aaAthleteId } = athlete;

  // Construct the image URL using aaAthleteId
  const imageUrl = `https://media.aws.iaaf.org/athletes/${aaAthleteId}.jpg`;

  return (
    <a
      href={`http://localhost:5173/athlete-data/${urlSlug}`}
      className="block w-4/5 mx-auto my-4"
      target="_self"
      rel="noopener noreferrer"
    >
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow flex items-center">
        {/* Athlete Image */}
        <img
          src={imageUrl}
          alt={`${givenName} ${familyName}`}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://via.placeholder.com/150"; // Fallback to default image
          }}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />

        {/* Athlete Details */}
        <div>
          <h1 className="text-2xl font-bold">{`${givenName} ${familyName}`}</h1>
          <p className="text-gray-700"><strong>Gender:</strong> {gender}</p>
          <p className="text-gray-700"><strong>Date of Birth:</strong> {birthDate}</p>
          <p className="text-gray-700"><strong>Disciplines:</strong> {disciplines}</p>
        </div>
      </div>
    </a>
  );
};

export default AthleteCard;
