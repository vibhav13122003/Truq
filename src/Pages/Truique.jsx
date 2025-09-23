import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../Components/Sidebar";
import { HiOutlineUser } from "react-icons/hi";

// --- Modal Component ---
const ReportDetailModal = ({
  report,
  onClose,
  statusColors,
  refreshHazards,
}) => {
  if (!report) return null;

  const handleAction = async (action) => {
    try {
      let url = `https://truq-backend-vfnps.ondigitalocean.app/api/hazards/${report._id}`;
      let method = "PUT"; // Default method

      if (action === "Approve") {
        url = `https://truq-backend-vfnps.ondigitalocean.app/api/hazards/${report._id}/approve`;
      } else if (action === "Delete") {
        method = "DELETE";
      }
      else if (action === "Reject") {
        url = `https://truq-backend-vfnps.ondigitalocean.app/api/hazards/${report._id}/reject`;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        // For Reject, we send a specific body. For others, it might be empty.
        body:
          action === "Reject"
            ? JSON.stringify({ isApproved: false })
            : undefined,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Action failed");

      alert(`${action} successful!`);
      refreshHazards(); // Re-fetch the list to show updated data
      onClose(); // Close the modal
    } catch (err) {
      console.error(err);
      alert(`Failed to ${action}: ${err.message}`);
    }
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
              {
                label: "Date & Time",
                value: new Date(report.datetime).toLocaleString(),
              },
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
            {report.imageUrl ? (
              <img
                src={report.imageUrl}
                alt='Hazard'
                className='object-cover h-full w-full rounded-lg'
              />
            ) : (
              <p className='text-gray-400'>No Image Provided</p>
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
            className='hover:bg-green-600 text-white px-4 py-2 rounded text-sm'
            style={{ backgroundColor: "#22C55E" }}
          >
            Approve
          </button>
          <button
            onClick={() => handleAction("Reject")}
            className='hover:bg-red-600 text-white px-4 py-2 rounded text-sm'
            style={{ backgroundColor: "#EF4444" }}
          >
            Reject
          </button>
          <button
            onClick={() => handleAction("Delete")}
            className='hover:bg-teal-700 text-white px-4 py-2 rounded text-sm'
            style={{ backgroundColor: "#008080" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const TruqieReports = () => {
  const [currentRoute, setRoute] = useState("truqie");
  const [selectedReport, setSelectedReport] = useState(null);
  const [hazards, setHazards] = useState([]);

  const statusColors = {
    Pending: "bg-[#F3F4F6] text-[#374151]",
    Verified: "bg-[#DCFCE7] text-[#166534]",
    Rejected: "bg-[#FEE2E2] text-[#991B1B]",
  };

  // ✅ **FIX:** Define fetchHazards outside useEffect, wrapped in useCallback
  const fetchHazards = useCallback(async () => {
    try {
      const res = await fetch(
        "https://truq-backend-vfnps.ondigitalocean.app/api/hazards"
      );
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();

      const formatted = data.hazards.map((h, index) => {
        const year = new Date(h.createdAt).getFullYear();
     return {
       ...h,
       id: `HR-${year}-${String(index + 1).padStart(3, "0")}`,
       datetime: h.createdAt,
       location: h.location,
       email: h.user?.email || "Unknown",
       hazard: h.hazardClass,
       vehicles: h.vehicleType,
       status: h.status, // Directly use the status from the API
       description: h.description,
       imageUrl: h.photos?.[0] || null,
     };
      });

      setHazards(formatted);
    } catch (err) {
      console.error("Error fetching hazards:", err);
    }
  }, []); // No dependencies, so it's created only once.

  // ✅ **FIX:** Call the memoized fetchHazards function on component mount
  useEffect(() => {
    fetchHazards();
  }, [fetchHazards]);

  return (
    <div className='flex h-screen'>
      <Sidebar currentRoute={currentRoute} setRoute={setRoute} />

      <div className='bg-gray-50 flex-1 flex flex-col'>
        <header className='bg-white shadow-sm p-4 border-b border-gray-200 flex justify-between items-center'>
          <h1 className='text-xl font-semibold text-gray-700'>Admin Panel</h1>
          <button className='flex items-center p-2 rounded-full bg-gray-100 hover:bg-gray-200'>
            <HiOutlineUser className='w-5 h-5 text-gray-600' />
          </button>
        </header>

        <main className='p-8 overflow-y-auto'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>
            Truqie Reports
          </h2>
          <p className='text-gray-500 mb-6'>
            Manage and moderate reports by the drivers
          </p>

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
                {hazards.map((r) => (
                  <tr
                    key={r.id}
                    className='border-b last:border-none hover:bg-gray-50'
                  >
                    <td className='p-4'>{r.id}</td>
                    <td className='p-4'>
                      {new Date(r.datetime).toLocaleString()}
                    </td>
                    <td className='p-4'>{r.location}</td>
                    <td className='p-4'>{r.email}</td>
                    <td className='p-4'>⚠️ {r.hazard}</td>
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
        </main>
      </div>

      {/* ✅ **FIX:** This now works because fetchHazards is in scope */}
      {selectedReport && (
        <ReportDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          statusColors={statusColors}
          refreshHazards={fetchHazards}
        />
      )}
    </div>
  );
};

export default TruqieReports;
