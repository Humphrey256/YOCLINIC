import React from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css'; // Import your CSS styles

function Registration() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission
    // You can add any form validation or processing logic here if needed
    navigate('/login'); // Redirect to login page after form submission
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Registration Form */}
      <div className="bg-gray-200 bg-opacity-90 p-8 shadow-lg mt-20" style={{ width: '600px', borderRadius: '30px' }}>
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form className="space-y-4 flex flex-col items-center" onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="text" placeholder="Contact" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="text" placeholder="Address" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Re-enter Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full pop-button"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
