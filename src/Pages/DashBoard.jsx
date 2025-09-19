// src/pages/DashboardPage.jsx
import React from "react";
import Sidebar from "../Components/Sidebar"; // ✅ make sure path is correct

import {
  HiOutlineUsers,
  HiOutlineUser,
  HiOutlineUserGroup,
  HiOutlineExclamationCircle,
  HiOutlineChevronDown,
  
} from "react-icons/hi";

import { RiAlertFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa6";
import { FaUserCog, FaClipboardList } from "react-icons/fa";


// Users Icon
const UsersIcon = () => (
  <HiOutlineUserGroup className='w-8 h-8' style={{ color: "#008080" }} />
);
const SubscribersIcon = () => (
  <FaCreditCard className='w-8 h-8' style={{ color: "#008080" }} />
);
const TruqieAlertIcon = () => (
  <RiAlertFill className='w-8 h-8' style={{ color: "#008080" }} />
);


// User Icon
const UserIcon = () => <HiOutlineUser className='w-6 h-6' />;

// Down Arrow Icon
const DownArrowIcon = () => <HiOutlineChevronDown className='w-4 h-4 ml-1' />;


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
              <button
                className='  text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-700 transition duration-300'
                style={{ backgroundColor: "#008080" }}
              >
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
                  <FaClipboardList style={{ color: "#008080" }} />
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
                  <FaUserCog style={{ color: "#008080" }} />
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
