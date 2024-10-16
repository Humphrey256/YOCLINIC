import React from 'react';
import Header from './header';
import Header from './footer';
//import ReactDOM from 'react-dom';
import './services.css'; // Tailwind CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles

function Services() {
  const handleAppointmentClick = () => {
    window.location.href = "appointment.html";
  };

  const [showText, setShowText] = React.useState(true);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setShowText(!showText);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [showText]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="relative">
        <img src="./yoclinic/image3.jpg" alt="Doctor in a clinic" className="w-full h-96 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          {showText && (
            <div className="highlight-box text-center text-lg mb-4">
              Trusted partner in health, dedicated to delivering compassionate and personalized care to patients
            </div>
          )}
          <button className="bg-blue-600 text-white py-2 px-4 rounded-full pop-button" onClick={handleAppointmentClick}>
            Make Appointment
          </button>
        </div>
      </div>
      <div className="container mx-auto p-4 mt-4">
        <h2 className="text-2xl font-bold text-center mb-4">Our Services</h2>
        <div className="flex flex-nowrap justify-center">
          <div className="bg-black rounded-lg shadow-md p-4 m-5 w-1/5 hover:scale-110 transition duration-300">
            <h3 className="text-lg font-bold mb-2 text-white">Primary Care </h3>
            <ul >
              <li className="text-white"> Routine check-ups and physical exams</li>
              <li className="text-white">Diagnosis and treatment of common illnesses and conditions</li>
              <li className="text-white">Preventive care and health screenings</li>
            </ul>
          </div>
          <div className="bg-black rounded-lg shadow-md p-4 m-5 w-1/5 hover:scale-110 transition duration-300">
            <h3 className="text-lg font-bold mb-2 text-white">Specialized Care</h3>
            <ul>
              <li className="text-white">Pediatrics</li>
              <li className="text-white">Gynecology</li>
              <li className="text-white">Dermatology</li>
              <li className="text-white">Cardiology</li>
            </ul>
          </div>
          <div className="bg-black rounded-lg shadow-md p-4 m-5 w-1/5 hover:scale-110 transition duration-300">
            <h3 className="text-lg font-bold mb-2 text-white">Urgent Care</h3>
            <ul>
              <li className="text-white">Treatment of minor injuries and illnesses</li>
              <li className="text-white">Rapid access to medical care during non-emergency hours</li>
            </ul>
          </div>
          <div className="bg-black rounded-lg shadow-md p-4 m-5 w-1/5 hover:scale-110 transition duration-300">
            <h3 className="text-lg font-bold mb-2 text-white">Laboratory and Diagnostic Services</h3>
            <ul>
              <li className="text-white">Blood tests</li>
              <li className="text-white">Imaging (X-rays, ultrasounds)</li>
              <li className="text-white">Other diagnostic procedures</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;