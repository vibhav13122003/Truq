// src/pages/DashboardPage.jsx
import React from "react";
import Sidebar from "../Components/Sidebar"; // ✅ make sure path is correct

// --- Icon Components for Dashboard ---
const UsersIcon = () => (
  <svg
    className='w-8 h-8 text-blue-500'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm-9 3a2 2 0 11-4 0 2 2 0 014 0z'
    ></path>
  </svg>
);

const SubscribersIcon = () => (
  <svg
    className='w-8 h-8 text-green-500'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
    ></path>
  </svg>
);

const TruqieAlertIcon = () => (
  <svg
    className='w-8 h-8 text-yellow-500'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    ></path>
  </svg>
);

const UserIcon = () => (
  <svg
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    />
  </svg>
);

const DownArrowIcon = () => (
  <svg
    className='w-4 h-4 ml-1'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
);

// --- Reusable Components ---
const StatCard = ({ icon, value, title, subtitle }) => (
  <div className='bg-white p-6 rounded-lg shadow-md flex items-center space-x-4'>
    <div className='bg-gray-100 p-3 rounded-full'>{icon}</div>
    <div>
      <p className='text-3xl font-bold text-gray-800'>{value}</p>
      <p className='text-sm font-semibold text-gray-600'>{title}</p>
      <p className='text-xs text-gray-400'>{subtitle}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  let statusClasses = "";
  switch (status.toLowerCase()) {
    case "new":
      statusClasses = "bg-blue-100 text-blue-800";
      break;
    case "completed":
      statusClasses = "bg-green-100 text-green-800";
      break;
    case "in progress":
      statusClasses = "bg-yellow-100 text-yellow-800";
      break;
    default:
      statusClasses = "bg-gray-100 text-gray-800";
  }
  return <span className={`${baseClasses} ${statusClasses}`}>{status}</span>;
};

// --- Main Dashboard ---
const DashboardPage = () => {
  const stats = [
    {
      icon: <UsersIcon />,
      value: "1,532",
      title: "Total Users",
      subtitle: "Free + Paid Users",
    },
    {
      icon: <SubscribersIcon />,
      value: "438",
      title: "Paid Subscribers",
      subtitle: "Active Subscriptions",
    },
    {
      icon: <TruqieAlertIcon />,
      value: "127",
      title: "truqie",
      subtitle: "Last 30 Days",
    },
  ];

  const recentTruqies = [
    {
      date: "2025-01-18",
      location: "Highway 101, Mile 45",
      type: "Construction",
      status: "New",
    },
    {
      date: "2025-01-18",
      location: "Main St & Oak Ave",
      type: "Accident",
      status: "Completed",
    },
    {
      date: "2025-01-17",
      location: "Interstate 95, Exit 23",
      type: "Weather",
      status: "In Progress",
    },
    {
      date: "2025-01-17",
      location: "Route 66, Mile 128",
      type: "Road Work",
      status: "New",
    },
    {
      date: "2025-01-16",
      location: "City Center Bridge",
      type: "Maintenance",
      status: "In Progress",
    },
  ];

  return (
    <div className='flex h-screen'>
      {/* Sidebar on left */}
      <Sidebar />

      {/* Dashboard content */}
      <div className='bg-gray-50 flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white shadow-sm p-4 border-b border-gray-200'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-gray-700'>Admin Panel</h1>
            <button className='flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
              <UserIcon />
              <DownArrowIcon />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className='p-8 overflow-y-auto'>
          {/* Dashboard Title */}
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-800'>Dashboard</h2>
            <p className='text-gray-500 mt-1'>Welcome to the admin panel</p>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Recent Truqie */}
          <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Recent truqie
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-sm text-left text-gray-600'>
                <thead className='bg-gray-50 text-xs text-gray-700 uppercase tracking-wider'>
                  <tr>
                    <th className='p-4'>Date</th>
                    <th className='p-4'>Location</th>
                    <th className='p-4'>Type</th>
                    <th className='p-4'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTruqies.map((item, index) => (
                    <tr key={index} className='border-b'>
                      <td className='p-4 whitespace-nowrap'>{item.date}</td>
                      <td className='p-4'>{item.location}</td>
                      <td className='p-4'>{item.type}</td>
                      <td className='p-4'>
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='mt-6'>
              <button className='bg-teal-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-700 transition duration-300'>
                View All Reports
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Quick Actions
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='bg-white p-6 rounded-lg shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow'>
                <div className='bg-gray-100 p-3 rounded-lg'>
                  <svg
                    className='w-6 h-6 text-teal-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className='font-bold text-gray-800'>Manage Truqie</h4>
                  <p className='text-sm text-gray-500 mt-1'>
                    Review and manage truqie reports
                  </p>
                </div>
              </div>
              <div className='bg-white p-6 rounded-lg shadow-md flex items-start space-x-4 hover:shadow-lg transition-shadow'>
                <div className='bg-gray-100 p-3 rounded-lg'>
                  <UsersIcon />
                </div>
                <div>
                  <h4 className='font-bold text-gray-800'>User Management</h4>
                  <p className='text-sm text-gray-500 mt-1'>
                    Manage user accounts and permissions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
