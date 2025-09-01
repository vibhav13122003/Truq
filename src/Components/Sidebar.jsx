// Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// --- SVG Icon Components for Sidebar ---
const DashboardIcon = () => (
  <svg
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    ></path>
  </svg>
);

const TruqieIcon = () => (
  <svg
    className='w-6 h-6'
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

const UserManagementIcon = () => (
  <svg
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    ></path>
  </svg>
);

const SettingsIcon = () => (
  <svg
    className='w-6 h-6'
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    ></path>
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    ></path>
  </svg>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { route: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { route: "/truqie", label: "Truqie", icon: <TruqieIcon /> },
    {
      route: "/userManagement",
      label: "User Management",
      icon: <UserManagementIcon />,
    },
    { route: "/settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className='w-64 h-screen bg-[#008080] text-white flex flex-col'>
      {/* Logo */}
      <div className='flex items-center justify-center p-6 space-x-2'>
        <div className='bg-white rounded-md p-1.5'>
          <span className='font-bold text-[#008080] text-xl'>T</span>
        </div>
        <span className='text-3xl font-bold'>truq</span>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-4 py-4'>
        <ul className='space-y-2'>
          {navItems.map((item) => (
            <li key={item.route}>
              <button
                onClick={() => navigate(item.route)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                  location.pathname === item.route
                    ? "bg-gray-800 text-white"
                    : "hover:bg-teal-700"
                }`}
              >
                {item.icon}
                <span className='font-medium'>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
