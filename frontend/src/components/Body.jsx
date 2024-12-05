import { Link } from "react-router-dom";

const Body = () => {
  return (
    <div id="athlete-tools" className="bg-white text-gray-800 py-12 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-center text-center">
        {/* Text Section */}
        <div className="w-full bg-white p-6 rounded-xl mb-8">
          <h2 className="text-4xl font-semibold text-black mb-4">Athlete Tools</h2>
          <p className="text-lg text-gray-800 mb-6">
            Tools and tips to help athletes at all levels navigate their anti-doping rights and responsibilities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool Links */}
            {[
              { label: "Check Your Medications", icon: "📋", path: "/check-medications" },
              { label: "Sample Collection Process", icon: "🧪", path: "/sample-collection" },
              { label: "Whereabouts", icon: "🧭", path: "/whereabouts" },
              { label: "Therapeutic Use Exemptions", icon: "🩺", path: "/therapeutic-use" },
              { label: "Supplement Connect", icon: "💊", path: "/supplement-connect" },
              { label: "Athlete Connect", icon: "🔗", path: "/athlete-connect" },
              { label: "Play Clean", icon: "🎮", path: "/play-clean" },
              { label: "News & Announcements", icon: "📰", path: "/news" },
            ].map((tool, index) => (
              <Link
                key={index}
                to={tool.path}
                className="flex flex-col items-center space-y-4 bg-blue-600 p-6 rounded-lg text-white border-2 border-transparent hover:bg-white hover:text-blue-600 hover:border-blue-600 transition"
              >
                <div className="text-4xl">{tool.icon}</div>
                <span className="font-medium">{tool.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
