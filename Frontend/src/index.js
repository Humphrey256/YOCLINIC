import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';  // Updated imports
import Header from './header';  // Correct path to Header.js
import Footer from './footer';  // Correct path to Footer.js
//import './index.css';
import Registration from './registration';  // Import your registration.js component
import Login from './login';  // Import your login.js component
import Services from './services'; // Import the Services component
import Appointment from './appointment'; // Import the Home component

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
      <div className="background-image">
        <img src="" alt="Doctor in a clinic" className="w-full h-100 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <div className="flex justify-between items-center mb-4">
            <input type="button" value="&#8249;" className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={() => setStatement(0)} />
            <div className="highlight-box text-center text-lg">
              {statements[statement]}
            </div>
            <input type="button" value="&#8250;" className="bg-blue-600 text-white py-2 px-4 rounded-full" onClick={() => setStatement(1)} />
          </div>

          {/* Use the handleGetStartedClick function to navigate to the registration page */}
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
      <Route path="/registration" element={<Registration />} />  {/* Route to the registration page */}
      <Route path="/login" element={<Login />} />  {/* Route to the login page */}
      <Route path="/services" element={<Services />} />  {/* Route to the services page */}
      <Route path="/appointment" element={<Appointment />} />  {/* Route to the appointments page */}
    </Routes>
  </Router>,
  document.getElementById('root')
);

export default App;
