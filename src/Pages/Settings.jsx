import React from "react";

// --- Sidebar ---
import Sidebar from "../Components/Sidebar";

// --- Settings Page ---
const SettingsPage = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className='flex-1 p-8 overflow-y-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-1'>Settings</h1>
        <p className='text-gray-600 mb-6'>
          Manage your account and system settings
        </p>

        {/* Profile Information */}
        <div className='bg-white rounded-lg shadow p-6 mb-6'>
          <h2 className='text-lg font-semibold text-gray-700 mb-4'>
            Profile Information
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                Admin Name
              </label>
              <input
                type='text'
                defaultValue='John Anderson'
                className='w-full border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-800'
                disabled
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                Email Address
              </label>
              <input
                type='email'
                defaultValue='john.anderson@truq.com'
                className='w-full border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-800'
                disabled
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>
                Role
              </label>
              <input
                type='text'
                defaultValue='Super Admin'
                className='w-full border rounded-md px-3 py-2 text-sm bg-gray-100 text-gray-800'
                disabled
              />
            </div>
          </div>
          <div className='mt-4'>
            <button className='px-5 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 text-sm font-semibold'>
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
                className='w-full border rounded-md px-3 py-2 text-sm'
                placeholder='Confirm new password'
              />
            </div>
          </div>
          <div className='mt-4'>
            <button className='px-5 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 text-sm font-semibold'>
              Update Password
            </button>
          </div>
        </div>

        {/* Account Actions */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold text-gray-700 mb-4'>
            Account Actions
          </h2>
          <button className='px-5 py-2 bg-gray-100 text-teal-700 border border-teal-600 rounded-md hover:bg-gray-200 text-sm font-semibold'>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
