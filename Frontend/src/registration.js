import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './registration.css'; // Tailwind CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles

function Registration() {
  const navigate = useNavigate(); // Initialize navigate

  // Handle Sign Up and navigate to login page
  const handleSignUp = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      {/* Registration Form */}
      <div className="bg-gray-200 bg-opacity-90 p-8 shadow-lg mt-20" style={{ width: '600px', borderRadius: '30px' }}>
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form className="space-y-4 flex flex-col items-center">
          <input type="text" placeholder="Name" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="text" placeholder="Contact" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="text" placeholder="Address" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Re-enter Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <button type="button" className="bg-blue-600 text-white p-2 rounded-full mt-4" style={{ width: '400px', borderRadius: '70px' }} onClick={handleSignUp}>
            Sign up
          </button>
        </form>
        <div className="text-center mt-4">
          <span>Already signed up? <a href="/login" className="text-blue-600">Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default Registration;
