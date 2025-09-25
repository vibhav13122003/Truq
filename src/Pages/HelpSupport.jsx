import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { HiOutlineUser } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const DeleteIcon = () => <MdDelete className='w-6 h-6' />;
const demoQueries = [
  {
    _id: "1",
    email: "john.smith@email.com",
    subject: "John Smith",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    createdAt: "2024-01-15T00:00:00Z",
    status: "Open",
    userType: "Paid",
  },
  {
    _id: "2",
    email: "sarah.j@email.com",
    subject: "Sarah Johnson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    createdAt: "2024-02-20T00:00:00Z",
    status: "Open",
    userType: "Free",
  },
  {
    _id: "3",
    email: "mike.davis@email.com",
    subject: "Mike Davis",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    createdAt: "2024-03-10T00:00:00Z",
    status: "Open",
    userType: "Paid",
  },
  {
    _id: "4",
    email: "emily.w@email.com",
    subject: "Emily Wilson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    createdAt: "2024-04-05T00:00:00Z",
    status: "Open",
    userType: "Free",
  },
  {
    _id: "5",
    email: "robert.brown@email.com",
    subject: "Robert Brown",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    createdAt: "2024-05-12T00:00:00Z",
    status: "Open",
    userType: "Paid",
  },
  {
    _id: "6",
    email: "lisa.anderson@email.com",
    subject: "Lisa Anderson",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    createdAt: "2024-06-08T00:00:00Z",
    status: "Open",
    userType: "Free",
  },
];

const HelpSupportPage = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [userTypeFilter, setUserTypeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQueries, setFilteredQueries] = useState([]);

  useEffect(() => {
    // Use demo data instead of fetching from API
    setQueries(demoQueries || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let tempQueries = [...queries];

    if (statusFilter) {
      tempQueries = tempQueries.filter((q) => q.status === statusFilter);
    }

    if (userTypeFilter) {
      tempQueries = tempQueries.filter((q) => q.userType === userTypeFilter);
    }

    if (searchTerm) {
      tempQueries = tempQueries.filter(
        (q) =>
          q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredQueries(tempQueries);
  }, [statusFilter, userTypeFilter, searchTerm, queries]);

  const handleResetFilters = () => {
    setStatusFilter("");
    setUserTypeFilter("");
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className='flex h-screen bg-gray-50'>
        <Sidebar />
        <div className='flex-1 p-8 text-center'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex h-screen bg-gray-50 font-sans'>
      <Sidebar />
      <div className='bg-gray-50 flex-1 flex flex-col'>
        {/* Header */}
        <header className='bg-white shadow-sm p-4 border-b border-gray-200'>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold text-gray-700'>Admin Panel</h1>
            <button className='flex items-center p-2 rounded-full bg-gradient-to-b text-white from-[#008080] to-[#004040] hover:bg-teal-700'>
              <HiOutlineUser className='w-6 h-6' />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className='p-8 overflow-y-auto'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            Help & Support
          </h2>
          <p className='text-gray-500 mb-6'>Respond to user Queries.</p>

          {/* Filters */}
          <div className='mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex gap-2'>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='border rounded px-3 py-1 text-sm'
              >
                <option value=''>Status</option>
                <option value='Open'>Open</option>
                <option value='Closed'>Closed</option>
              </select>

              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className='border rounded px-3 py-1 text-sm'
              >
                <option value=''>User Type</option>
                <option value='Paid'>Paid</option>
                <option value='Free'>Free</option>
              </select>

              <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by name, email, or phone...'
                className='border rounded px-3 py-1 text-sm w-full md:w-64'
              />
            </div>

            <div>
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
              <thead className='bg-[#DBDBDB] text-gray-600 uppercase text-xs'>
                <tr>
                  <th className='p-4 font-semibold'>Email</th>
                  <th className='p-4 font-semibold'>Subject</th>
                  <th className='p-4 font-semibold'>Message</th>
                  <th className='p-4 font-semibold'>Date</th>
                  <th className='p-4 font-semibold'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {filteredQueries.map((q) => (
                  <tr key={q._id} className='hover:bg-gray-50'>
                    <td className='p-4 text-gray-700'>{q.email}</td>
                    <td className='p-4 font-medium text-gray-900'>
                      {q.subject}
                    </td>
                    <td className='p-4 text-gray-700 truncate max-w-xs'>
                      {q.message}
                    </td>
                    <td className='p-4 text-gray-700'>
                      {new Date(q.createdAt).toLocaleDateString("en-CA")}
                    </td>
                    <td className='p-4 flex gap-2'>
                      <button className='px-3 py-1 rounded text-sm text-white  bg-gradient-to-b from-[#008080] to-[#004040] hover:bg-red-600'>
                        View
                      </button>
                      <button className='px-3 py-1 rounded text-sm text-white bg-red-600 hover:bg-red-700 flex items-center gap-1'>
                        <MdDelete className='w-4 h-4' />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredQueries.length === 0 && (
                  <tr>
                    <td colSpan={5} className='p-4 text-center text-gray-500'>
                      No queries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HelpSupportPage;
