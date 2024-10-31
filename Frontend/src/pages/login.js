import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import '@fortawesome/fontawesome-free/css/all.min.css';
import './login.css';
import Header from './layout/header'; // Import Header from header.j

// Header Component
//function Header() {
  //return (
    //<header className="bg-blue-600 text-white p-4 text-center">
      //<h1>YoClinic</h1>
    //</header>
  //);
//}

// Login Component
function Login() {
  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [error, setError] = useState(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission

    setLoading(true); // Set loading state to true

    try {
      // Simulated API request (Replace with real endpoint)
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      
      console.log('Login successful:', response.data);
      
      // Navigate to homepage after successful login
      navigate('/home'); // Adjust the path as per your app structure
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || 'An error occurred');
      setError(error.response?.data?.message || 'An error occurred'); // Set error message
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };

  const handleRegisterClick = () => {
    navigate('./pages/services'); // Navigate to registartion page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      {/* Login Form */}
      <div className="form-container">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-4 flex flex-col items-center" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full mt-4"
            style={{ width: '100%', borderRadius: '70px' }}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <span>Don't have an account? <a href="./pages/registration" className="text-blue-600">Register</a></span>
        </div>
      </div>
    </div>
  );
}
export default Login;