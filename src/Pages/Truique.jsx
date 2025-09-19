import React, { useState } from "react";
import Sidebar from "../Components/Sidebar"; // <-- adjust path if needed

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

const UserIcon = () => <HiOutlineUser className='w-5 h-5 text-gray-600' />;
const DownArrowIcon = () => (
  <HiOutlineChevronDown className='w-4 h-4 ml-1 text-gray-600' />
);

const ReportDetailModal = ({ report, onClose, statusColors }) => {
  if (!report) return null;

  const handleAction = (action) => {
    console.log(`${action} clicked for report: ${report.id}`);
    onClose();
  };

  return (
    <div
      className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-start pt-20'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-3xl m-4 overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex justify-between items-center px-6 py-4 border-b border-gray-200'>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>{report.id}</h3>
            <p className='text-sm text-gray-500'>Hazard Report Details</p>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-900 rounded-full p-1'
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className='px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-3'>
            {[
              { label: "Date & Time", value: report.datetime },
              { label: "Location", value: report.location },
              { label: "Reported By", value: report.email },
              { label: "Hazard Type", value: report.hazard },
              { label: "Affected Vehicles", value: report.vehicles },
            ].map((item) => (
              <div key={item.label}>
                <p className='text-xs text-gray-500'>{item.label}</p>
                <p className='text-sm font-medium text-gray-800'>
                  {item.value}
                </p>
              </div>
            ))}
            <div>
              <p className='text-xs text-gray-500'>Status</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  statusColors[report.status]
                }`}
              >
                {report.status}
              </span>
            </div>
          </div>
          <div className='flex items-center justify-center bg-gray-50 rounded-lg'>
            {/* You can replace this with an actual image if you have one */}
            {report.imageUrl ? (
              <img
                src={report.imageUrl}
                alt='Hazard'
                className='object-cover h-full w-full rounded-lg'
              />
            ) : (
              <p className='text-gray-400'>Image Placeholder</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className='px-6 py-4 border-t border-gray-200'>
          <p className='text-xs text-gray-500'>Description</p>
          <p className='text-sm text-gray-800 mt-1'>{report.description}</p>
        </div>

        {/* Footer Actions */}
        <div className='px-6 py-4 border-t border-gray-200 flex space-x-2'>
          <button
            onClick={() => handleAction("Approve")}
            className=' hover:bg-green-600 text-white px-4 py-2 rounded text-sm'
            style={{ backgroundColor: "#22C55E" }}
          >
            Approve
          </button>
          <button
            onClick={() => handleAction("Reject")}
            className=' hover:bg-red-600 text-white px-4 py-2 rounded text-sm'
            style={{ backgroundColor: "#EF4444" }}
          >
            Reject
          </button>
          <button
            onClick={() => handleAction("Delete")}
            className=' hover:bg-teal text-white px-4 py-2 rounded text-sm flex items-center gap-1'
            style={{ backgroundColor: "#008080" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const TruqieReports = () => {
  const [currentRoute, setRoute] = useState("truqie");
  const [selectedReport, setSelectedReport] = useState(null);

  // --- DEMO DATA ADDED HERE ---
  const reports = [
    {
      id: "HRT-001",
      datetime: "2025-09-19 11:45",
      location: "NH-27, Near Unnao Toll Plaza",
      email: "driver.one@email.com",
      hazard: "Accident",
      vehicles: "All Vehicles",
      status: "Pending",
      description:
        "A multi-car pile-up is blocking two lanes. Traffic is heavily congested. Emergency services are on the scene.",
      imageUrl: "https://via.placeholder.com/400x300.png?text=Accident+Scene",
    },
    {
      id: "HRT-002",
      datetime: "2025-09-19 09:15",
      location: "Lucknow-Agra Expressway, KM 152",
      email: "trucker.two@email.com",
      hazard: "Pothole",
      vehicles: "Trucks, Buses",
      status: "Verified",
      description:
        "There is a very large and deep pothole in the right lane that could cause significant damage to tires and suspension, especially for heavy vehicles.",
      imageUrl: "https://via.placeholder.com/400x300.png?text=Large+Pothole",
    },
    {
      id: "HRT-003",
      datetime: "2025-09-18 22:30",
      location: "Kanpur Bypass Road",
      email: "driver.three@email.com",
      hazard: "Roadblock",
      vehicles: "All Vehicles",
      status: "Verified",
      description:
        "A fallen tree from last night's storm is completely blocking the road. Authorities have been notified.",
      imageUrl: "https://via.placeholder.com/400x300.png?text=Fallen+Tree",
    },
    {
      id: "HRT-004",
      datetime: "2025-09-18 17:00",
      location: "SH-38, Near Bithoor",
      email: "commuter.four@email.com",
      hazard: "Water Logging",
      vehicles: "Cars, Bikes",
      status: "Rejected",
      description:
        "Minor water logging reported after rain, but it has since cleared up and is no longer a hazard.",
      imageUrl: null,
    },
    {
      id: "HRT-005",
      datetime: "2025-09-19 15:20",
      location: "Ganga Barrage, Kanpur",
      email: "driver.five@email.com",
      hazard: "Heavy Traffic",
      vehicles: "All Vehicles",
      status: "Pending",
      description:
        "Unusual traffic jam on the Ganga Barrage bridge heading towards Unnao. Cause is unknown.",
      imageUrl: "https://via.placeholder.com/400x300.png?text=Traffic+Jam",
    },
  ];
const statusColors = {
  Pending: "bg-[#F3F4F6] color-[#374151]",   // light gray bg, dark gray text
  Verified: "bg-[#DCFCE7] color-[#166534]",  // light green bg, darker green text
  Rejected: "bg-[#FEE2E2] color-[#991B1B]",  // light red bg, darker red text
};

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <Sidebar currentRoute={currentRoute} setRoute={setRoute} />

      {/* Main content */}
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

        <main className='p-8 overflow-y-auto'>
          {/* Filters */}
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-800'>Truqie Reports</h2>
            <p className='text-gray-500 mt-1'>
              Manage and moderate reports by the drivers
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-2 mb-6'>
            <select className='border border-gray-300 rounded px-3 py-2 text-sm'>
              <option>All Status</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Rejected</option>
            </select>
            <input
              type='text'
              placeholder='Search by location, type, or ID...'
              className='flex-1 border border-gray-300 rounded px-3 py-2 text-sm'
            />
            <button className='px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200'>
              Clear Filters
            </button>
          </div>

          {/* Reports Table */}
          <div className='bg-white rounded-lg shadow-md overflow-x-auto mb-6'>
            <table className='min-w-full text-sm text-gray-600'>
              <thead className='bg-gray-50 text-xs text-gray-700 uppercase tracking-wider'>
                <tr>
                  {[
                    "Report ID",
                    "Date/Time",
                    "Location",
                    "Email ID",
                    "Hazard Type",
                    "Vehicle Types",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className='p-4 text-left'>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr
                    key={r.id}
                    className='border-b last:border-none hover:bg-gray-50'
                  >
                    <td className='p-4'>{r.id}</td>
                    <td className='p-4'>{r.datetime}</td>
                    <td className='p-4'>{r.location}</td>
                    <td className='p-4'>{r.email}</td>
                    <td className='p-4 flex items-center gap-1'>
                      <span className='text-yellow-500'>⚠️</span> {r.hazard}
                    </td>
                    <td className='p-4'>{r.vehicles}</td>
                    <td className='p-4'>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          statusColors[r.status]
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className='p-4'>
                      <button
                        onClick={() => setSelectedReport(r)}
                        className='px-3 py-1 rounded text-sm text-white'
                        style={{ backgroundColor: "#008080" }}
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
          <div className='bg-white p-6 rounded-lg shadow-md mb-6 text-sm'>
            <h3 className='font-semibold mb-2'>Status Legend</h3>
            <div className='flex flex-wrap gap-4 text-gray-600'>
              <span>
                <span className='px-2 py-1 bg-gray-200 rounded text-xs'>
                  Pending
                </span>{" "}
                Awaiting review
              </span>
              <span>
                <span className='px-2 py-1 bg-green-100 rounded text-xs'>
                  Verified
                </span>{" "}
                Confirmed hazard
              </span>
              <span>
                <span className='px-2 py-1 bg-red-100 rounded text-xs'>
                  Rejected
                </span>{" "}
                Invalid or resolved
              </span>
            </div>
          </div>
        </main>
      </div>

      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          statusColors={statusColors}
        />
      )}
    </div>
  );
};

export default TruqieReports;
