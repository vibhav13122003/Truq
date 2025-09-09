import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";




const UserTypeBadge = ({ type }) => (
  <span
    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
      type === "Paid"
        ? "bg-orange-100 text-orange-600"
        : "bg-gray-100 text-gray-600"
    }`}
  >
    {type}
  </span>
);

const UserDetailsModal = ({
  user,
  profile,
  reports = [],
  onClose,
  loading,
}) => {
  if (!user) return null;

  // Reusable component for displaying details exactly as in the screenshot
  const DetailItem = ({ text }) => (
    <p className="text-sm text-gray-700">{text}</p>
  );

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4'>
      <div className='bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-xl shadow-lg'>
        {/* Modal Header */}
        <div className='sticky top-0 bg-white z-10 flex justify-between items-center border-b p-6'>
          <h2 className='text-xl font-semibold text-gray-800'>User Details</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-700 text-2xl leading-none'
          >
            &times;
          </button>
        </div>

        <div className='p-6 space-y-8'>
          {/* Basic Information Section */}
          <section>
            <h3 className='text-base font-semibold text-gray-800 mb-4'>
              Basic Information
            </h3>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
              <div>
                <p className='text-sm text-gray-500'>Username</p>
                <p className='text-base font-medium text-gray-800'>
                  {user.name}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Email</p>
                <p className='text-base font-medium text-gray-800'>
                  {user.email}
                </p>
              </div>
            </div>
          </section>

          {/* Subscription Information Section */}
          <section>
            <h3 className='text-base font-semibold text-gray-800 mb-4'>
              Subscription Information
            </h3>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4 items-start'>
              <div>
                <p className='text-sm text-gray-500'>Status</p>
                <span className='inline-flex items-center px-2.5 py-0.5 mt-0.5 rounded-md bg-green-100 text-green-700 text-sm font-medium'>
                  Active
                </span>
              </div>
              <div>
                <p className='text-sm text-gray-500'>Joined On</p>
                <p className='text-base font-medium text-gray-800'>
                  {new Date(user.createdAt).toLocaleDateString("en-CA")}
                </p>
              </div>
            </div>
          </section>

          {/* truq Profiles Section */}
          <section>
            <h3 className='text-base font-semibold text-gray-800 mb-4'>
              truq Profiles
            </h3>
            {loading ? (
              <p className='text-gray-500 mt-2'>Loading profiles...</p>
            ) : profile && profile.length > 0 ? (
              <div className='bg-gray-50 border rounded-lg p-4 space-y-4'>
                <p className='text-sm text-gray-600 font-medium'>
                  Total truq Profiles: {profile.length}
                </p>
                {profile.map((p) => (
                  <div
                    key={p._id}
                    className='border rounded-lg p-4 shadow-sm bg-white'
                  >
                    <div className='flex justify-between items-start mb-4'>
                      <h4 className='font-semibold text-gray-800'>
                        {p.profileName}
                      </h4>
                      <span className='inline-flex items-center px-2.5 py-0.5 rounded-md bg-green-100 text-green-700 text-sm font-medium'>
                        Active
                      </span>
                    </div>

                    <div className='flex justify-between'>
                      {/* Left Column */}
                      <div className='space-y-2'>
                        <DetailItem text={`Vehicle Type :${p.vehicle.type}`} />
                        <DetailItem text={`Height (m):${p.vehicle.height_m}`} />
                        <DetailItem text={`Width (m):${p.vehicle.width_m}`} />
                        <DetailItem text={`Axles :${p.vehicle.axles}`} />
                        <DetailItem
                          text={`Articulated : ${
                            p.isArticulated ? "Yes" : "No"
                          }`}
                        />
                      </div>

                      {/* Middle Column with Avatar */}

                      {/* Right Column */}
                      <div className='space-y-2 text-sm'>
                        <DetailItem text={`Profile Name :${p.profileName}`} />
                        <DetailItem text={`Length (m):${p.vehicle.length_m}`} />
                        <DetailItem
                          text={`Weight (kg):${p.vehicle.weight_kg}`}
                        />
                      </div>
                    </div>

                    {/* Trailer Information - only shown if articulated */}
                    {p.isArticulated &&
                      p.trailers &&
                      p.trailers.length > 0 &&
                      p.trailers.map((trailer, index) => (
                        <div
                          key={trailer._id || index}
                          className='mt-4 pt-4 border-t border-dashed'
                        >
                          <div className='grid grid-cols-2 gap-x-12'>
                            <div className='space-y-2'>
                              <DetailItem
                                text={`Trailer Number :${index + 1}`}
                              />
                              <DetailItem
                                text={`Height (m):${trailer.height_m}`}
                              />
                              <DetailItem
                                text={`Width (m):${trailer.width_m}`}
                              />
                              <DetailItem
                                text={`Laden :${
                                  trailer.isLaden ? "Yes" : "No"
                                }`}
                              />
                            </div>
                            <div className='space-y-2'>
                              <DetailItem
                                text={`Length (m):${trailer.length_m}`}
                              />
                              <DetailItem
                                text={`Weight (kg):${trailer.weight_kg}`}
                              />
                              <DetailItem text={`Axles :${trailer.axles}`} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500 mt-2'>No profiles found.</p>
            )}
          </section>

          {/* User Submitted Reports Section */}
          <section>
            <h3 className='text-base font-semibold text-gray-800 mb-4'>
              User Submitted Reports
            </h3>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-gray-600 text-sm'>Recent Reports Submitted</p>
              <span className='text-blue-600 bg-blue-100 text-xs font-semibold cursor-pointer px-2 py-1 rounded'>
                {reports.length} Reports
              </span>
            </div>
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='p-4 bg-gray-50 border rounded-lg text-center'>
                <p className='text-2xl font-bold text-gray-900'>
                  {reports.filter((r) => r.isRecent).length}
                </p>
                <p className='text-sm text-gray-600'>This Month</p>
              </div>
              <div className='p-4 bg-gray-50 border rounded-lg text-center'>
                <p className='text-2xl font-bold text-gray-900'>
                  {reports.length}
                </p>
                <p className='text-sm text-gray-600'>Total Reports</p>
              </div>
            </div>

            <div className='flex justify-between items-center mb-3'>
              <h4 className='text-gray-700 font-medium'>Latest Reports</h4>
              <span className='text-red-600 text-sm font-medium cursor-pointer'>
                View All
              </span>
            </div>

            <div className='space-y-3'>
              {reports.slice(0, 2).map((r) => (
                <div key={r.id} className='border p-4 rounded-lg bg-gray-50'>
                  <div className='flex justify-between items-start'>
                    <p className='font-semibold text-gray-800'>{r.title}</p>
                    <span className='inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium'>
                      Verified
                    </span>
                  </div>
                  <p className='text-gray-600 text-sm my-1'>{r.description}</p>
                  <div className='flex items-center text-xs text-gray-500 mt-2'>
                    <svg
                      className='w-4 h-4 mr-1.5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      ></path>
                    </svg>
                    {r.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [currentRoute, setRoute] = useState("userManagement");
  
  const mockReports = [
      {id: 1, title: 'Rest Stop - Highway 95', description: 'Reported parking availability and facilities', date: 'July 18, 2024', isRecent: true},
      {id: 2, title: 'Fuel Station - I-40', description: 'Updated fuel prices and truck amenities', date: 'July 15, 2024', isRecent: true},
      {id: 3, title: 'Weight Station - Route 66', description: 'Long wait times reported', date: 'June 28, 2024', isRecent: false},
  ];
 useEffect(() => {
   const fetchUsers = async () => {
     try {
       const res = await fetch("http://localhost:5000/api/auth/users");
       if (!res.ok) throw new Error(`Error: ${res.status}`);
       const data = await res.json();
       setUsers(Array.isArray(data) ? data : []);
     } catch (err) {
       console.error("Error fetching users:", err);
       setUsers([]);
     } finally {
       setLoading(false);
     }
   };
   fetchUsers();
 }, []);

 const fetchUserProfile = async (user) => {
   setSelectedUser(user);
   setProfileLoading(true);
   try {
     const res = await fetch(
       `http://localhost:5000/api/profiles/user/${user._id}`
     );
     if (!res.ok) throw new Error("Profile not found");
     const profiles = await res.json();
     setSelectedProfile(profiles);
   } catch (err) {
     console.error("Error fetching profile:", err);
     setSelectedProfile([]);
   } finally {
     setProfileLoading(false);
   }
 };


  if (loading) {
    return (
      <div className='flex h-screen bg-gray-50'>
        <Sidebar currentRoute={currentRoute} setRoute={setRoute} />
        <div className='flex-1 p-8 text-center'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar currentRoute={currentRoute} setRoute={setRoute} />
      <div className='flex-1 p-8 overflow-y-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-1'>
          User Management
        </h1>
        <p className='text-gray-600 mb-6'>Manage and monitor user accounts</p>

        <div className='bg-white shadow rounded-lg overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-gray-50 text-gray-600 uppercase text-xs'>
              <tr>
                <th className='p-4 font-semibold'>Name</th>
                <th className='p-4 font-semibold'>Email</th>
                <th className='p-4 font-semibold'>User Type</th>
                <th className='p-4 font-semibold'>Joined On</th>
                <th className='p-4 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {users.map((user) => (
                <tr key={user._id} className='hover:bg-gray-50'>
                  <td className='p-4 font-medium text-gray-900'>{user.name}</td>
                  <td className='p-4 text-gray-700'>{user.email}</td>
                  <td className='p-4'>
                    <UserTypeBadge type={user.isPaid ? "Paid" : "Free"} />
                  </td>
                  <td className='p-4 text-gray-700'>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className='p-4'>
                    <button
                      onClick={() => fetchUserProfile(user)}
                      className='px-4 py-1.5 bg-teal-600 text-white rounded-md text-xs font-bold hover:bg-teal-700 transition'
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          profile={selectedProfile}
          reports={mockReports}
          loading={profileLoading}
          onClose={() => {
            setSelectedUser(null);
            setSelectedProfile(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagementPage;

