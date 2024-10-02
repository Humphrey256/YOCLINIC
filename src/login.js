import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Removed BrowserRouter from here
import '@fortawesome/fontawesome-free/css/all.min.css';
import './login.css';

// Header Component
function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 text-center">
      <h1>YoClinic</h1>
    </header>
  );
}

// Login Component
function Login() {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = () => {
    window.location.href = 'index.html'; // Assuming this is the destination for successful login
  };

  const handleRegisterClick = () => {
    navigate('/registration'); // Navigate to registration page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      {/* Login Form */}
      <div className="bg-gray-200 bg-opacity-90 p-8 shadow-lg mt-20" style={{ width: '600px', borderRadius: '30px' }}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form className="space-y-4 flex flex-col items-center">
          <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <button type="button" className="bg-blue-600 text-white p-2 rounded-full mt-4" style={{ width: '400px', borderRadius: '70px' }} onClick={handleLogin}>Login</button>
        </form>
        <div className="text-center mt-4">
          <span>Don't have an account? <button onClick={handleRegisterClick} className="text-blue-600 underline">Register</button></span>
        </div>
      </div>
    </div>
  );
}

// Registration Component
function Registration() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <div className="bg-gray-200 bg-opacity-90 p-8 shadow-lg mt-20" style={{ width: '600px', borderRadius: '30px' }}>
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form className="space-y-4 flex flex-col items-center">
          <input type="text" placeholder="Full Name" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded opacity-80" style={{ width: '400px' }} />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-full mt-4" style={{ width: '400px', borderRadius: '70px' }}>Register</button>
        </form>
      </div>
    </div>
  );
}

// App Component with Routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
}

export default App;
