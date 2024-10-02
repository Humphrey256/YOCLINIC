import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  // Updated imports
import Header from './header';  // Correct path to Header.js
import Footer from './footer';  // Correct path to Footer.js
import './index.css';
//import Login from './registration';  // Import your login.js component
import Registration from './registration';

function App() {
  const [statement, setStatement] = React.useState(0);

  // Use useNavigate hook for navigation
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/registration');  // Navigate to the registration page
  };

  const statements = [
    "Delivering compassionate care with precision and empathy, YOCLINIC is your trusted partner in health, dedicated to providing personalized medical solutions that put patients first.",
    "Transforming healthcare with innovative solutions, YOCLINIC is committed to delivering exceptional patient experiences and improving lives through compassionate care."
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="relative">
        <img src="./yoclinic/image3.jpg" alt="Doctor in a clinic" className="w-full h-96 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <div className="flex justify-between items-center mb-4">
            <input type="button" value="&#8249;" className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={() => setStatement(0)} />
            <div className="highlight-box text-center text-lg">
              {statements[statement]}
            </div>
            <input type="button" value="&#8250;" className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={() => setStatement(1)} />
          </div>

          {/* Use the handleGetStartedClick function to navigate to the login page */}
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full pop-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Render the application with React Router
ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/registration" element={<Registration />} />  {/* Route to the login page */}
    </Routes>
  </Router>,
  document.getElementById('root')
);
