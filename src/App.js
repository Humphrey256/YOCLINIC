import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import './index.css';

function App() {
  const navigate = useNavigate();

  const [statement, setStatement] = React.useState(0);

  const handleAppointmentClick = () => {
    navigate('/registration');
  };
  <br></br>

  const statements = [
    "Delivering compassionate care with precision and empathy, YOCLINIC is your trusted partner in health, dedicated to providing personalized medical solutions that put patients first.",
    "Transforming healthcare with innovative solutions, YOCLINIC is committed to delivering exceptional patient experiences and improving lives through compassionate care."
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="relative">
        <img src="./yoclinic/image3.jpg" alt="Doctor in a clinic" className="w-full h-96 object-cover " />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <div className="flex justify-between items-center mb-4">
            <input type="button" value="&#8249;" className="slider-button" onClick={() => setStatement(0)} />
            <div className="highlight-box text-center text-lg">
              {statements[statement]}
            </div>
            <input type="button" value="&#8250;" className="slider-button" onClick={() => setStatement(1)} />
          </div>
          <button className="pop-button" onClick={handleAppointmentClick}>
            Get Started
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;