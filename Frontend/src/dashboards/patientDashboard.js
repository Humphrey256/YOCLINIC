import React, { useState } from 'react';

const PatientDashboard = () => {
  // State variables to store form inputs and appointment details
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [showDetails, setShowDetails] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDetails(true);
  };

  return (
    <div className="bg-white min-h-screen font-roboto">
      {/* Header */}
      <div className="w-full bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-white text-lg font-bold">YOCLINIC</h1>
        <div className="text-white flex items-center space-x-4">
          <i className="fas fa-bell"></i>
          <button className="bg-transparent text-white font-bold py-2 px-4 rounded">Log Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center mt-8">
        <div className="w-2/3 flex">
          {/* Appointment Form */}
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Patients Dashboard</h2>
            <h3 className="font-bold mb-2">Book Appointment</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full p-2 bg-gray-200"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="doctor"
                  placeholder="Select Doctor"
                  className="w-full p-2 bg-gray-200"
                  required
                  value={formData.doctor}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  id="date"
                  className="w-full p-2 bg-gray-200"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="time"
                  id="time"
                  className="w-full p-2 bg-gray-200"
                  required
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="reason"
                  placeholder="Reason"
                  className="w-full p-2 bg-gray-200"
                  required
                  value={formData.reason}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
            </form>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-300 mx-4"></div>

          {/* Appointment Details */}
          {showDetails && (
            <div className="w-1/2">
              <h3 className="font-bold mb-2 underline">Appointments Details</h3>
              <p className="mb-2"><span className="font-bold">Patient Name:</span> {formData.name}</p>
              <p className="mb-2"><span className="font-bold">Doctor:</span> {formData.doctor}</p>
              <p className="mb-2"><span className="font-bold">Date:</span> {formData.date}</p>
              <p className="mb-2"><span className="font-bold">Time:</span> {formData.time}</p>
              <p className="mb-2"><span className="font-bold">Reason:</span> {formData.reason}</p>
              <div className="flex mt-4">
                <button className="bg-blue-600 text-white py-2 px-4 rounded mr-2">Edit</button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded mr-2">Book</button>
                <button className="bg-blue-600 text-white py-2 px-4 rounded">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
