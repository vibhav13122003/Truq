import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import {
  HiOutlineUser,
  HiOutlineChevronDown,
  HiOutlineX, // Import the 'X' icon
  HiOutlineClock, // Import the Clock icon
} from "react-icons/hi";

// (Other imports as before)
import { RiAlertFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { FaUserCog, FaClipboardList } from "react-icons/fa";

const UserIcon = () => (
  <HiOutlineUser className='w-6 h-6' />
);

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

// A reusable badge component for consistent styling
const StatusBadge = ({ text, color = "green", count = false }) => {
  const colorClasses = {
    green: "bg-emerald-50 text-emerald-600",
    teal: "bg-teal-50 text-teal-600",
  };

  const paddingClass = count ? "px-2.5 py-1" : "px-2 py-0.5";

  return (
    <span
      className={`inline-flex items-center ${paddingClass} rounded-full text-xs font-medium ${colorClasses[color]}`}
    >
      {text}
    </span>
  );
};

const UserDetailsModal = ({
  user,
  profile,
  reports = [],
  onClose,
  loading,
}) => {
  if (!user) return null;

  const [activeTab, setActiveTab] = useState("profiles");

  const DetailItem = ({ label, value }) => (
    <p className='text-sm text-gray-700 whitespace-nowrap'>
      <span className='text-gray-500'>{label} :</span> {value}
    </p>
  );

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-4'>
      <div className='bg-white w-full max-w-3xl max-h-[95vh] overflow-y-auto rounded-xl shadow-lg no-scrollbar'>
        {/* Modal Header */}
        <div className='sticky top-0 bg-white/80 backdrop-blur-sm z-10 flex justify-between items-center p-6 border-b'>
          <div>
            <h2 className='text-xl font-bold text-gray-900'>{user.name}</h2>
            <p className='text-sm text-gray-500'>User Details</p>
          </div>
          <button
            onClick={onClose}
            className='p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          >
            <HiOutlineX className='w-6 h-6' />
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
                <StatusBadge text='Active' color='green' />
              </div>
              <div>
                <p className='text-sm text-gray-500'>Joined On</p>
                <p className='text-base font-medium text-gray-800'>
                  {new Date(user.createdAt).toLocaleDateString("en-CA")}
                </p>
              </div>
            </div>
          </section>

          {/* --- NEW TAB INTERFACE --- */}
          <div>
            {/* Tab Navigation */}
            <div className='border-b border-gray-200'>
              <nav className='-mb-px flex space-x-6' aria-label='Tabs'>
                <button
                  onClick={() => setActiveTab("profiles")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "profiles"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  truq Profiles
                </button>
                <button
                  onClick={() => setActiveTab("truqies")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "truqies"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  truqies
                </button>
                <button
                  onClick={() => setActiveTab("restStops")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "restStops"
                      ? "border-teal-500 text-teal-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Rest Stops
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className='pt-6'>
              {activeTab === "profiles" && (
                <section>
                  {loading ? (
                    <p className='text-gray-500 mt-2'>Loading profiles...</p>
                  ) : profile && profile.length > 0 ? (
                    <div className='space-y-4'>
                      <p className='text-sm text-gray-600 font-medium'>
                        Total truq Profiles : {profile.length}
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
                            <StatusBadge text='Active' color='green' />
                          </div>

                          <div className='grid grid-cols-2 gap-x-8'>
                            {/* Left Column */}
                            <div className='space-y-2'>
                              <DetailItem
                                label='Vehicle Type'
                                value={p.vehicle.type}
                              />
                              <DetailItem
                                label='Height (m)'
                                value={p.vehicle.height_m}
                              />
                              <DetailItem
                                label='Width (m)'
                                value={p.vehicle.width_m}
                              />
                              <DetailItem
                                label='Axles'
                                value={p.vehicle.axles}
                              />
                              <DetailItem
                                label='Articulated'
                                value={p.isArticulated ? "Yes" : "No"}
                              />
                            </div>

                            {/* Right Column */}
                            <div className='space-y-2 text-sm'>
                              <DetailItem
                                label='Profile Name'
                                value={p.profileName}
                              />
                              <DetailItem
                                label='Length (m)'
                                value={p.vehicle.length_m}
                              />
                              <DetailItem
                                label='Weight (kg)'
                                value={p.vehicle.weight_kg}
                              />
                            </div>
                          </div>

                          {/* Trailer Information */}
                          {p.isArticulated &&
                            p.trailers &&
                            p.trailers.length > 0 &&
                            p.trailers.map((trailer, index) => (
                              <div
                                key={trailer._id || index}
                                className='mt-4 pt-4 border-t'
                              >
                                <div className='grid grid-cols-2 gap-x-8'>
                                  <div className='space-y-2'>
                                    <DetailItem
                                      label='Trailer Number'
                                      value={index + 1}
                                    />
                                    <DetailItem
                                      label='Height (m)'
                                      value={trailer.height_m}
                                    />
                                    <DetailItem
                                      label='Width (m)'
                                      value={trailer.width_m}
                                    />
                                    <DetailItem
                                      label='Laden'
                                      value={trailer.isLaden ? "Yes" : "No"}
                                    />
                                  </div>
                                  <div className='space-y-2'>
                                    <DetailItem
                                      label='Length (m)'
                                      value={trailer.length_m}
                                    />
                                    <DetailItem
                                      label='Weight (kg)'
                                      value={trailer.weight_kg}
                                    />
                                    <DetailItem
                                      label='Axles'
                                      value={trailer.axles}
                                    />
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
              )}
              {activeTab === "truqies" && (
                <div>
                  <p className='text-gray-500'>
                    Content for truqies will be shown here.
                  </p>
                </div>
              )}
              {activeTab === "restStops" && (
                <div>
                  <p className='text-gray-500'>
                    Content for Rest Stops will be shown here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Submitted Reports Section (Kept for completeness) */}
          {/* User Submitted Reports Section */}
          <section>
            <h3 className='text-base font-semibold text-gray-800 mb-4'>
              User Submitted Reports
            </h3>

            {/* Summary Cards */}
            <div className='flex items-center justify-between mb-6'>
              <div className='grid grid-cols-2 gap-4 w-full max-w-md'>
                <div className='p-4 border rounded-lg bg-gray-50'>
                  <p className='text-sm text-gray-500'>This Month</p>
                  <p className='text-2xl font-bold text-gray-800'>
                    {
                      reports.filter(
                        (r) =>
                          new Date(r.createdAt).getMonth() ===
                            new Date().getMonth() &&
                          new Date(r.createdAt).getFullYear() ===
                            new Date().getFullYear()
                      ).length
                    }
                  </p>
                </div>
                <div className='p-4 border rounded-lg bg-gray-50'>
                  <p className='text-sm text-gray-500'>Total Reports</p>
                  <p className='text-2xl font-bold text-gray-800'>
                    {reports.length}
                  </p>
                </div>
              </div>

              <StatusBadge
                text={`${reports.length} Reports`}
                color='teal'
                count={true}
              />
            </div>

            {/* Latest Reports */}
            <div className='flex justify-between items-center mb-4'>
              <p className='text-gray-600 text-sm'>Latest Reports</p>
              <button className='text-sm font-medium text-teal-600 hover:underline'>
                View All
              </button>
            </div>

            {reports.length > 0 ? (
              <div className='space-y-3'>
                {reports.slice(0, 3).map((r) => (
                  <div key={r._id} className='border p-4 rounded-lg bg-gray-50'>
                    <div className='flex justify-between items-start'>
                      <p className='font-semibold text-gray-800'>
                        {r.hazardClass || "Hazard Report"}
                      </p>
                      <StatusBadge
                        text={r.approved ? "Verified" : "Pending Review"}
                        color={r.approved ? "green" : "teal"}
                      />
                    </div>
                    <p className='text-gray-600 text-sm my-1'>
                      {r.description}
                    </p>
                    <div className='flex items-center text-xs text-gray-500 mt-2'>
                      <HiOutlineClock className='w-4 h-4 mr-1.5 text-gray-400' />
                      {new Date(r.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>No hazard reports found.</p>
            )}
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
  const [selectedReports, setSelectedReports] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState(""); // Paid/Free
  const [userTypeFilter, setUserTypeFilter] = useState(""); // any other type if exists
   const [searchTerm, setSearchTerm] = useState("");

  const mockReports = [
    {
      id: 1,
      title: "Rest Stop - Highway 95",
      description: "Reported parking availability and facilities",
      date: "July 18, 2024",
      isRecent: true,
    },
    {
      id: 2,
      title: "Fuel Station - I-40",
      description: "Updated fuel prices and truck amenities",
      date: "July 15, 2024",
      isRecent: true,
    },
    {
      id: 3,
      title: "Weight Station - Route 66",
      description: "Long wait times reported",
      date: "June 28, 2024",
      isRecent: false,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://truq-backend-vfnps.ondigitalocean.app/api/auth/users"
        );
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();

        // Filter out the support email
        const filteredUsers = Array.isArray(data)
          ? data.filter((user) => user.email !== "support@truq.com.au")
          : [];

        setUsers(filteredUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
   useEffect(() => {
     let tempUsers = [...users];

     if (statusFilter) {
       tempUsers = tempUsers.filter((u) =>
         statusFilter === "Paid" ? u.isPaid : !u.isPaid
       );
     }

     if (userTypeFilter) {
       tempUsers = tempUsers.filter((u) => u.userType === userTypeFilter);
     }

     if (searchTerm) {
       tempUsers = tempUsers.filter(
         (u) =>
           u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (u.phone && u.phone.includes(searchTerm))
       );
     }

     setFilteredUsers(tempUsers);
   }, [statusFilter, userTypeFilter, searchTerm, users]);

   const handleResetFilters = () => {
     setStatusFilter("");
     setUserTypeFilter("");
     setSearchTerm("");
   };

  // Fetch user profiles + hazards
  const fetchUserProfile = async (user) => {
    setSelectedUser(user);
    setProfileLoading(true);
    try {
      // Fetch profiles
      const profileRes = await fetch(
        `https://truq-backend-vfnps.ondigitalocean.app/api/profiles/user/${user._id}`
      );
      const profiles = profileRes.ok ? await profileRes.json() : [];

      // Fetch hazard reports
      const reportsRes = await fetch(
        `https://truq-backend-vfnps.ondigitalocean.app/api/hazards/user/${user._id}`
      );
      const hazards = reportsRes.ok ? await reportsRes.json() : [];

      setSelectedProfile(profiles);
      setSelectedReports(hazards.hazards || []);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setSelectedProfile([]);
      setSelectedReports([]);
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
       <div className='bg-gray-50 flex-1 flex flex-col'>
         <header className='bg-white shadow-sm p-4 border-b border-gray-200'>
           <div className='flex justify-between items-center'>
             <h1 className='text-xl font-semibold text-gray-700'>
               Admin Panel
             </h1>
             <button className='flex items-center p-2 rounded-full bg-gradient-to-b text-white from-[#008080] to-[#004040] hover:bg-teal-700'>
               <HiOutlineUser className='w-6 h-6' />
             </button>
           </div>
         </header>
         <main className='p-8 overflow-y-auto'>
           <div className='mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
             <div className='flex gap-2'>
               <select
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value)}
                 className='border rounded px-3 py-1 text-sm'
               >
                 <option value=''>Status</option>
                 <option value='Paid'>Paid</option>
                 <option value='Free'>Free</option>
               </select>

               <select
                 value={userTypeFilter}
                 onChange={(e) => setUserTypeFilter(e.target.value)}
                 className='border rounded px-3 py-1 text-sm'
               >
                 <option value=''>User Type</option>
                 <option value='Admin'>Admin</option>
                 <option value='User'>User</option>
                 {/* add other types as needed */}
               </select>
               <input
                 type='text'
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder='Search by name, email, or phone...'
                 className='border rounded px-3 py-1 text-sm w-full md:w-64'
               />
             </div>

             <div className='flex gap-2'>
               <button
                 onClick={handleResetFilters}
                 className='border rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-100'
               >
                 Clear Filters
               </button>
             </div>
           </div>

           <div className='bg-white shadow rounded-lg overflow-x-auto'>
             <table className='w-full text-left text-sm'>
               <thead className='bg-gray-50 text-gray-600 uppercase text-xs'>
                 <tr>
                   <th className='p-4 font-semibold'>Name</th>
                   <th className='p-4 font-semibold'>Email / Phone</th>
                   <th className='p-4 font-semibold'>User Type</th>
                   <th className='p-4 font-semibold'>Joined On</th>
                   <th className='p-4 font-semibold'>Actions</th>
                 </tr>
               </thead>
               <tbody className='divide-y divide-gray-200'>
                 {filteredUsers.map((user) => (
                   <tr key={user._id} className='hover:bg-gray-50'>
                     <td className='p-4 font-medium text-gray-900'>
                       {user.name}
                     </td>
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
                         className='px-3 py-1 rounded text-sm text-white bg-gradient-to-b from-[#008080] to-[#004040]'
                       >
                         View
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </main>
       </div>

       {selectedUser && (
         <UserDetailsModal
           user={selectedUser}
           profile={selectedProfile}
           reports={selectedReports}
           loading={profileLoading}
           onClose={() => {
             setSelectedUser(null);
             setSelectedProfile(null);
             setSelectedReports([]);
           }}
         />
       )}
     </div>
   );
};



export default UserManagementPage;
