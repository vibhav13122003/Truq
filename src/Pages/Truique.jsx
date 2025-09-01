import React, { useState } from "react";
import Sidebar from "../Components/Sidebar"; // <-- adjust path if needed

// --- New Modal Component ---
// This component displays the details of a single report in a modal dialog.
const ReportDetailModal = ({ report, onClose, statusColors }) => {
  if (!report) return null;

  // Handler for actions inside the modal (Approve, Reject, Delete)
  const handleAction = (action) => {
    console.log(`${action} clicked for report: ${report.id}`);
    onClose(); // Close the modal after action
  };

  return (
    // Backdrop
    <div
      className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center'
      onClick={onClose} // Close modal on backdrop click
    >
      {/* Modal Panel */}
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-3xl m-4'
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Modal Header */}
        <div className='flex justify-between items-start p-5 border-b rounded-t'>
          <div>
            <h3 className='text-2xl font-bold text-gray-900'>{report.id}</h3>
            <p className='text-base text-gray-500'>Hazard Report Details</p>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left Column: Details */}
          <div className='space-y-4'>
            <div>
              <p className='text-sm text-gray-500'>Date & Time</p>
              <p className='text-md font-semibold text-gray-800'>
                {report.datetime}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Location</p>
              <p className='text-md font-semibold text-gray-800'>
                {report.location}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Reported By</p>
              <p className='text-md font-semibold text-gray-800'>
                {report.email}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Hazard Type</p>
              <p className='text-md font-semibold text-gray-800'>
                {report.hazard}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Affected Vehicles</p>
              <p className='text-md font-semibold text-gray-800'>
                {report.vehicles}
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500'>Status</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  statusColors[report.status]
                }`}
              >
                {report.status}
              </span>
            </div>
          </div>
          {/* Right Column: Image */}
          <div className='flex items-center justify-center bg-gray-100 rounded-lg'>
            <p className='text-gray-400'>Image</p>
            {/* If you have an image URL, you can use an <img> tag here */}
            {/* <img src={report.imageUrl} alt="Hazard" className="rounded-lg object-cover w-full h-full" /> */}
          </div>
        </div>

        {/* Description Section */}
        <div className='px-6 pb-6'>
          <p className='text-sm text-gray-500'>Description</p>
          <div className='w-full bg-gray-50 p-3 rounded-md mt-1'>
            <p className='text-md text-gray-800'>{report.description}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className='flex items-center justify-start p-6 space-x-2 border-t border-gray-200 rounded-b'>
          <button
            onClick={() => handleAction("Approve")}
            className='text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Approve
          </button>
          <button
            onClick={() => handleAction("Reject")}
            className='text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Reject
          </button>
          <button
            onClick={() => handleAction("Delete")}
            className='text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 inline-block -mt-0.5 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const TruqieReports = () => {
  const [currentRoute, setRoute] = useState("truqie");
  const [selectedReport, setSelectedReport] = useState(null); // State to hold the report for the modal

  // Updated mock data with descriptions and more specific locations
  const reports = [
    {
      id: "HR-2024-001",
      datetime: "2024-01-15 14:30",
      location: "Interstate 95, Mile Marker 45, Jacksonville, FL",
      email: "driver@truq.com",
      hazard: "Weather",
      vehicles: "Truck, Car",
      status: "Pending",
      description:
        "Heavy fog reducing visibility to less than 50 feet. Multiple vehicles pulled over.",
    },
    {
      id: "HR-2024-002",
      datetime: "2024-01-15 09:15",
      location: "Route 66 Junction near Amarillo, TX",
      email: "trucker123@email.com",
      hazard: "Debris",
      vehicles: "Truck",
      status: "Verified",
      description:
        "Large metal debris, possibly from another vehicle, is blocking the right lane.",
    },
    {
      id: "HR-2024-003",
      datetime: "2024-01-14 22:45",
      location: "Highway 101 Bridge, Bixby Creek, CA",
      email: "safety@transport.com",
      hazard: "Animal Crossing",
      vehicles: "Car, Truck, RV",
      status: "Rejected",
      description:
        "Reported a deer on the road, but it was gone upon arrival. No longer a hazard.",
    },
    {
      id: "HR-2024-004",
      datetime: "2024-01-14 16:20",
      location: "I-10 Construction Zone, Phoenix, AZ",
      email: "fleet@logistics.com",
      hazard: "Construction",
      vehicles: "Truck, Car",
      status: "Pending",
      description: "Unmarked lane shift causing confusion and sudden braking.",
    },
  ];

  const statusColors = {
    Pending: "bg-gray-200 text-gray-700",
    Verified: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <Sidebar currentRoute={currentRoute} setRoute={setRoute} />

      {/* Main Content */}
      <div className='flex-1 p-8 overflow-y-auto'>
        {/* Header */}
        <h2 className='text-lg font-semibold mb-2'>Admin Panel</h2>
        <h1 className='text-2xl font-bold mb-1'>Truqie Reports</h1>
        <p className='text-gray-600 mb-6'>
          Manage and moderate truqie reports submitted by drivers
        </p>

        {/* Filters */}
        <div className='flex flex-wrap items-center space-x-2 mb-4'>
          <select className='border rounded px-3 py-2 text-sm'>
            <option>All Status</option>
            <option>Pending</option>
            <option>Verified</option>
            <option>Rejected</option>
          </select>
          <input
            type='text'
            placeholder='Search by location, type, or ID...'
            className='flex-1 border rounded px-3 py-2 text-sm'
          />
          <button className='px-4 py-2 text-sm bg-gray-100 rounded'>
            Clear Filters
          </button>
        </div>

        {/* Table */}
        <div className='bg-white shadow rounded-lg overflow-hidden'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 text-gray-600 text-left'>
              <tr>
                <th className='px-4 py-2'>Report ID</th>
                <th className='px-4 py-2'>Date/Time</th>
                <th className='px-4 py-2'>Location</th>
                <th className='px-4 py-2'>Email ID</th>
                <th className='px-4 py-2'>Hazard Type</th>
                <th className='px-4 py-2'>Vehicle Types</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className='border-b last:border-none'>
                  <td className='px-4 py-2'>{r.id}</td>
                  <td className='px-4 py-2'>{r.datetime}</td>
                  <td className='px-4 py-2'>{r.location}</td>
                  <td className='px-4 py-2'>{r.email}</td>
                  <td className='px-4 py-2 flex items-center space-x-1'>
                    <span className='text-yellow-500'>⚠️</span>
                    <span>{r.hazard}</span>
                  </td>
                  <td className='px-4 py-2'>{r.vehicles}</td>
                  <td className='px-4 py-2'>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        statusColors[r.status]
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => handleViewReport(r)}
                      className='bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 text-sm rounded'
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Legend */}
        <div className='mt-6 bg-white p-4 rounded-lg shadow text-sm'>
          <h3 className='font-semibold mb-2'>Status Legend</h3>
          <div className='flex flex-wrap gap-4'>
            <span>
              <span className='px-2 py-1 bg-gray-200 rounded text-gray-700 text-xs'>
                Pending
              </span>{" "}
              Awaiting review
            </span>
            <span>
              <span className='px-2 py-1 bg-green-100 rounded text-green-700 text-xs'>
                Verified
              </span>{" "}
              Confirmed hazard
            </span>
            <span>
              <span className='px-2 py-1 bg-red-100 rounded text-red-700 text-xs'>
                Rejected
              </span>{" "}
              Invalid or resolved
            </span>
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={handleCloseModal}
          statusColors={statusColors}
        />
      )}
    </div>
  );
};

export default TruqieReports;
