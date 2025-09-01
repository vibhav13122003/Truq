import React from "react";

const ReportDetailModal = ({ report, onClose, statusColors }) => {
  if (!report) return null;

  const handleAction = (action) => {
    console.log(`${action} clicked for report: ${report.id}`);
    onClose();
  };

  return (
    // Backdrop with decreased opacity

    <div
      className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center'
      onClick={onClose}
    >
      {/* Modal Panel */}
      <div
        className='bg-white rounded-lg shadow-xl w-full max-w-3xl m-4'
        onClick={(e) => e.stopPropagation()}
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

export default ReportDetailModal; // Export the modal component if it's in a separate file
