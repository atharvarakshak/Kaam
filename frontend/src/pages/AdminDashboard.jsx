import { useUser } from '@clerk/clerk-react';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  const { user } = useUser();

  return (
    <div className="flex">
      <main className="flex-1 ml-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome, {user.firstName || 'Admin'}</h2>
            <p>Email: {user.emailAddresses[0].emailAddress}</p>
            <p>Role: {user?.unsafeMetadata?.role || 'Admin'}</p>
          </div>

          {/* Recent Activities Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
            <ul className="space-y-2">
              <li className="bg-gray-100 p-3 rounded">No recent activities</li>
            </ul>
          </div>
        </div>

        {/* Admin Actions Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Admin Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Manage Users</h4>
              <p>View and manage user accounts, roles, and permissions.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Manage Users
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">View Reports</h4>
              <p>Generate reports for different activities and events.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                View Reports
              </button>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-4">System Settings</h4>
              <p>Adjust settings related to the platform and users.</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Settings
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
