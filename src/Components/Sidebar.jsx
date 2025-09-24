// Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineExclamationCircle,
  HiOutlineUsers,
  HiOutlineCog,
    HiOutlineUserGroup,
} from "react-icons/hi";
import { RiDashboard3Line } from "react-icons/ri";
import { RiAlertFill } from "react-icons/ri";
// --- SVG Icon Components for Sidebar ---
const DashboardIcon = () => <RiDashboard3Line className='w-5 h-5' />;

// Truqie Icon
const TruqieIcon = () => <HiOutlineExclamationCircle className='w-5 h-5' />;
const TruqieAlertIcon = () => (
  <RiAlertFill className='w-5 h-5' />
);
// User Management Icon
const UserManagementIcon = () => <HiOutlineUserGroup className='w-5 h-5' />;

// Settings Icon
const SettingsIcon = () => <HiOutlineCog className='w-5 h-5' />;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { route: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { route: "/truique", label: "Truique", icon: <TruqieAlertIcon /> },
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
