import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Header from './header';
import './registration.css'; // Tailwind CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles

function Registration() {
  const navigate = useNavigate(); // Initialize navigate

  const [username, setUsername] = useState(''); // Initialize username state
  const [email, setEmail] = useState(''); // Initialize email state
  const [password, setPassword] = useState(''); // Initialize password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Initialize confirm password state
  const [contact, setContact] = useState(''); // Initialize contact state
  const [address, setAddress] = useState(''); // Initialize address state
  const [error, setError] = useState(null); // Initialize error state
  //const [loading, setLoading] = useState(false); // Initialize loading state
  
  // Handle Sign Up and send form data to backend
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    const userData = {
      username,
      email,
      password,
      confirmPassword,
      contact,
      address
    };

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:5000 ./api/register', userData);
      console.log(response.data.message);

      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error.response?.data?.message || 'An error occurred');
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      {/* Registration Form */}
      <div className="form-container">
      
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form className="space-y-4 flex flex-col items-center" onSubmit={handleSignUp}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded opacity-80"
            style={{ width: '100%' }}
          />
          {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full mt-4"
            style={{ width: '100%', borderRadius: '70px' }}
          >
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
