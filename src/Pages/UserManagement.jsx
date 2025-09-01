import React, { useState } from "react";
import Sidebar from "../Components/Sidebar"; // ⬅️ Import your existing Sidebar component

// --- Icon Components ---
const CloseIcon = () => (
  <svg
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M6 18L18 6M6 6l12 12'
    />
  </svg>
);
const ClockIcon = () => (
  <svg
    className='w-4 h-4 mr-1.5 text-gray-500'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

// --- Reusable Components ---
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

const StatusBadge = ({ status, small = false }) => {
  let classes = small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";
  let statusClass = "";

  switch (status.toLowerCase()) {
    case "active":
      statusClass = "bg-green-100 text-green-700";
      break;
    case "pending":
    case "pending review":
      statusClass = "bg-yellow-100 text-yellow-700";
      break;
    case "verified":
      statusClass = "bg-blue-100 text-blue-700";
      break;
    default:
      statusClass = "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`font-semibold rounded-full inline-block ${classes} ${statusClass}`}
    >
      {status}
    </span>
  );
};

// --- Modal Component ---
const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  
  // Dummy data
  const vehicles = [
    {
      name: "Freightliner Cascadia",
      plate: "TRQ-1234",
      regDate: "Jan 15, 2024",
      year: 2020,
      vin: "1FJU...7890",
      status: "Active",
    },
    {
      name: "Peterbilt 579",
      plate: "TRQ-5678",
      regDate: "Feb 20, 2024",
      year: 2019,
      vin: "1XPBD...4567",
      status: "Active",
    },
    {
      name: "Kenworth T680",
      plate: "TRQ-9012",
      regDate: "Mar 10, 2024",
      year: 2021,
      vin: "1XKW...8901",
      status: "Pending",
    },
  ];

  const reports = [
    {
      title: "Rest Stop - Highway 95",
      date: "July 18, 2024",
      details: "Reported parking availability and facilities",
      status: "Verified",
    },
    {
      title: "Fuel Station - I-40",
      date: "July 15, 2024",
      details: "Updated fuel prices and truck amenities",
      status: "Verified",
    },
    {
      title: "Parking Area - Route 66",
      date: "July 12, 2024",
      details: "Reported new overnight parking spot",
      status: "Pending Review",
    },
  ];

  return (
    <div
      className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div className='bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b sticky top-0 bg-white z-10'>
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold text-gray-800'>User Details</h2>
            <button
              onClick={onClose}
              className='text-gray-500 hover:text-gray-800'
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className='p-8 space-y-8'>
          {/* Basic Info */}
          <section>
            <h3 className='text-lg font-semibold text-gray-700 mb-4 border-b pb-2'>
              Basic Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
              <div>
                <span className='font-medium text-gray-500'>Name</span>
                <p className='text-gray-800'>{user.name}</p>
              </div>
              <div>
                <span className='font-medium text-gray-500'>Email</span>
                <p className='text-gray-800'>{user.email}</p>
              </div>
              <div>
                <span className='font-medium text-gray-500'>Phone</span>
                <p className='text-gray-800'>{user.phone}</p>
              </div>
              <div>
                <span className='font-medium text-gray-500'>User Type</span>
                <p>
                  <UserTypeBadge type={user.type} />
                </p>
              </div>
            </div>
          </section>

          {/* Subscription Info */}
          <section>
            <h3 className='text-lg font-semibold text-gray-700 mb-4 border-b pb-2'>
              Subscription Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm'>
              <div>
                <span className='font-medium text-gray-500'>Status</span>
                <p>
                  <StatusBadge status='Active' small />
                </p>
              </div>
              <div>
                <span className='font-medium text-gray-500'>Joined On</span>
                <p className='text-gray-800'>{user.joined}</p>
              </div>
            </div>
          </section>

          {/* Registered Vehicles */}
          <section>
            <h3 className='text-lg font-semibold text-gray-700 mb-4 border-b pb-2'>
              Registered Vehicles
            </h3>
            <div className='bg-gray-50 p-4 rounded-md mb-4 flex justify-between items-center text-sm'>
              <div>
                <span className='font-medium text-gray-500'>
                  Total Vehicles
                </span>
                <p className='text-gray-800 font-bold text-lg'>3</p>
              </div>
              <div>
                <span className='font-medium text-gray-500'>
                  Registration Status
                </span>
                <p className='text-green-600 font-semibold'>Verified</p>
              </div>
            </div>
            <div className='space-y-4'>
              {vehicles.map((v, i) => (
                <div
                  key={i}
                  className='bg-white border border-gray-200 p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'
                >
                  <div>
                    <p className='font-bold text-gray-800'>{v.name}</p>
                    <p className='text-gray-500'>
                      License Plate:{" "}
                      <span className='text-gray-700'>{v.plate}</span>
                    </p>
                    <p className='text-gray-500'>
                      Reg. Date:{" "}
                      <span className='text-gray-700'>{v.regDate}</span>
                    </p>
                  </div>
                  <div>
                    <p className='text-gray-500'>
                      Year: <span className='text-gray-700'>{v.year}</span>
                    </p>
                    <p className='text-gray-500'>
                      VIN: <span className='text-gray-700'>{v.vin}</span>
                    </p>
                  </div>
                  <div className='flex items-start justify-end'>
                    <StatusBadge status={v.status} small />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Reports */}
          <section>
            <h3 className='text-lg font-semibold text-gray-700 mb-4 border-b pb-2'>
              User Submitted Reports
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm'>
              <div className='bg-gray-50 p-4 rounded-md'>
                <span className='font-medium text-gray-500'>
                  Recent Reports Submitted
                </span>
                <p className='text-gray-800 font-bold text-2xl'>
                  3 <span className='text-sm font-normal'>This Month</span>
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-md'>
                <span className='font-medium text-gray-500'>Total Reports</span>
                <p className='text-gray-800 font-bold text-2xl'>23</p>
              </div>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <h4 className='font-semibold text-gray-600'>Latest Reports</h4>
              <button className='text-sm text-teal-600 font-semibold hover:underline'>
                View All
              </button>
            </div>
            <div className='space-y-3'>
              {reports.map((r, i) => (
                <div
                  key={i}
                  className='bg-white border border-gray-200 p-4 rounded-md'
                >
                  <div className='flex justify-between items-start'>
                    <div>
                      <p className='font-semibold text-gray-800'>{r.title}</p>
                      <p className='text-sm text-gray-600 mt-1'>{r.details}</p>
                      <p className='text-xs text-gray-500 mt-2 flex items-center'>
                        <ClockIcon /> {r.date}
                      </p>
                    </div>
                    <StatusBadge status={r.status} small />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className='p-6 border-t sticky bottom-0 bg-gray-50 z-10 text-right'>
          <button
            onClick={onClose}
            className='px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm font-semibold'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page with Sidebar ---
const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentRoute, setRoute] = useState("userManagement");

  const users = [
    {
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 555-0123",
      type: "Paid",
      joined: "2024-01-15",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 555-0124",
      type: "Free",
      joined: "2024-02-20",
    },
    {
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "+1 555-0125",
      type: "Paid",
      joined: "2024-03-10",
    },
    {
      name: "Emily Wilson",
      email: "emily.w@email.com",
      phone: "+1 555-0126",
      type: "Free",
      joined: "2024-04-05",
    },
    {
      name: "Robert Brown",
      email: "robert.brown@email.com",
      phone: "+1 555-0127",
      type: "Paid",
      joined: "2024-05-12",
    },
    {
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 555-0128",
      type: "Free",
      joined: "2024-06-08",
    },
  ];

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar currentRoute={currentRoute} setRoute={setRoute} />

      {/* Main Content */}
      <div className='flex-1 p-8 overflow-y-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-1'>
          User Management
        </h1>
        <p className='text-gray-600 mb-6'>Manage and monitor user accounts</p>

        {/* Filters */}
        <div className='flex flex-wrap items-center gap-4 mb-6'>
          <select className='border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500'>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className='border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500'>
            <option>All User Types</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
          <input
            type='text'
            placeholder='Search by name, email, or phone...'
            className='flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 min-w-[250px]'
          />
          <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300'>
            Clear Filters
          </button>
        </div>

        {/* Table */}
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
              {users.map((user, idx) => (
                <tr key={idx} className='hover:bg-gray-50'>
                  <td className='p-4 font-medium text-gray-900'>{user.name}</td>
                  <td className='p-4 text-gray-700'>
                    {user.email}
                    <br />
                    <span className='text-gray-500 text-xs'>{user.phone}</span>
                  </td>
                  <td className='p-4'>
                    <UserTypeBadge type={user.type} />
                  </td>
                  <td className='p-4 text-gray-700'>{user.joined}</td>
                  <td className='p-4'>
                    <button
                      onClick={() => setSelectedUser(user)}
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

        {/* Modal */}
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
};

export default UserManagementPage;
