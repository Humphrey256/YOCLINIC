import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import your Tailwind CSS styles

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Any additional form validation logic can be added here
    navigate('/services'); // Redirect to services page after form submission
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Login Form */}
      <div className="bg-gray-200 bg-opacity-90 p-8 shadow-lg mt-20" style={{ width: '600px', borderRadius: '30px' }}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-4 flex flex-col items-center" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full pop-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
