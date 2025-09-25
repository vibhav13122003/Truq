import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { HiOutlineUser } from "react-icons/hi";

const UsersIcon = () => (
  <HiOutlineUser className='w-6 h-6' />
);

const SettingsPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name") || "");
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
      localStorage.setItem("name", res.data.user.name); // update localStorage
      setName(res.data.user.name);

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
      const token = localStorage.getItem("token");

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

  const handleLogout = () => {
    localStorage.clear(); // clear everything
    navigate("/"); // redirect to login page
  };

  const userId = localStorage.getItem("userId");

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />

      <div className='bg-gray-50 flex-1 flex flex-col'>
        <header className='bg-white shadow-sm p-4 border-b border-gray-200'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-gray-700'>Admin Panel</h1>
            <div className='flex items-center gap-4'>
              <button className='flex items-center p-2 rounded-full bg-gradient-to-b from-[#008080] to-[#004040] hover:bg-teal-700 text-white'>
                <UsersIcon />
              </button>
            </div>
          </div>
        </header>

        <main className='p-8 overflow-y-auto'>
          {/* Profile Information */}
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Settings
          </h2>
          <p className='text-gray-500 mb-6'>
            Manage and your account and system settings.
          </p>
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-lg font-semibold text-gray-700 mb-4'>
              Profile Information
            </h2>
            <div className='flex w-full'>
              <div className='w-full'>
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
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => handleAdminUpdate(userId)}
                className='px-5 py-2  text-white bg-gradient-to-b from-[#008080] to-[#004040] rounded-md hover:bg-teal-800 text-sm font-semibold'
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
            <div className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-600 mb-1 w-full'>
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
            {/* Account Actions */}
            <div className='mt-4 flex justify-end'>
              <button
                onClick={() => handlePasswordUpdate(userId)}
                className='px-5 py-2 bg-gradient-to-b from-[#008080] to-[#004040] text-white rounded-md hover:bg-teal-800 text-sm font-semibold'
              >
                Update Password
              </button>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-lg font-semibold text-gray-700 mb-4'>
              Account Action
            </h2>

            <div className='mt-4 '>
              <button
                onClick={handleLogout}
                className='px-5 py-2  text-white bg-gradient-to-b from-[#008080] to-[#004040] rounded-md hover:bg-teal-800 text-sm font-semibold'
              >
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
