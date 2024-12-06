import { useUser } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';

const AthleteDashboard = () => {
  const { user } = useUser();

  return (
    <div className="flex">
      <main className="flex-1 ml-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.firstName || 'Athlete'}</h2>
            <p>Email: {user.emailAddresses[0].emailAddress}</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-2">
              <li className="bg-gray-100 p-3 rounded">No recent activities</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AthleteDashboard;