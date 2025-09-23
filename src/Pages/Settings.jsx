import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { HiOutlineUser } from "react-icons/hi";

const UserIcon = () => <HiOutlineUser className='w-5 h-5 text-gray-600' />;

const SettingsPage = () => {
  const [name, setName] = useState("John Anderson");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const handleAdminUpdate = async (userId) => {
  if (newPassword && newPassword !== confirmPassword) {
    alert("New password and confirmation do not match");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `https://truq-backend-vfnps.ondigitalocean.app/api/auth/admin-update-user/${userId}`,
      {
        name,
        password: newPassword || undefined, // only send if exists
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert(res.data.msg);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.msg || "Admin update failed");
  }
};


  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // JWT token

      const res = await axios.put(
        "https://truq-backend-vfnps.ondigitalocean.app/api/users/update-profile",
        { password: newPassword, currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.msg);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Password update failed");
    }
  };
  const userId = localStorage.getItem("userId");

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />

      <div className='bg-gray-50 flex-1 flex flex-col'>
        <header className='bg-white shadow-sm p-4 border-b border-gray-200'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-gray-700'>Admin Panel</h1>
            <button className='flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
              <UserIcon />
            </button>
          </div>
        </header>

        <main className='p-8 overflow-y-auto'>
          {/* Profile Information */}
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-lg font-semibold text-gray-700 mb-4'>
              Profile Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full border rounded-md px-3 py-2 text-sm'
                />
              </div>
            </div>
            <div className='mt-4'>
              <button
                onClick={() => handleAdminUpdate(userId)}
                className='px-5 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 text-sm font-semibold'
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-lg font-semibold text-gray-700 mb-4'>
              Change Password
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Current Password
                </label>
                <input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className='w-full border rounded-md px-3 py-2 text-sm'
                  placeholder='Enter current password'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  New Password
                </label>
                <input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full border rounded-md px-3 py-2 text-sm'
                  placeholder='Enter new password'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1'>
                  Confirm New Password
                </label>
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full border rounded-md px-3 py-2 text-sm'
                  placeholder='Confirm new password'
                />
              </div>
            </div>
            <div className='mt-4'>
              <button
                onClick={() => handleAdminUpdate(userId)}
                className='px-5 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 text-sm font-semibold'
              >
                Update Password
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
