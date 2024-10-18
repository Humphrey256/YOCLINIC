import React from 'react';
import Header from './header';
//import Footer from './footer';
//import ReactDOM from 'react-dom';
import './appointment.css'; // Tailwind CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles



function Appointment() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [accountsOpen, setAccountsOpen] = React.useState(false);

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto p-4">
        <main className="mt-4">
          <div className="mb-4">
            <label className="block font-bold mb-1">Patient Information:</label>
            <input type="text" placeholder="Name" className="w-full p-2 border border-gray-300 mb-2" />
            <input type="text" placeholder="Contact details" className="w-full p-2 border border-gray-300" />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Appointment Type:</label>
            <div className="flex space-x-4">
              <label><input type="radio" name="appointment" /> general consultation</label>
              <label><input type="radio" name="appointment" /> specialist visit</label>
              <label><input type="radio" name="appointment" /> follow-up</label>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex space-x-4">
              <input type="text" placeholder="Date:" className="w-1/2 p-2 border border-gray-300" />
              <input type="text" placeholder="Time:" className="w-1/2 p-2 border border-gray-300" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Provider</label>
            <select className="w-full p-2 border border-gray-300">
              <option>Select Provider</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-1">Reason for Visit</label>
            <textarea className="w-full p-2 border border-gray-300" rows="4" placeholder="write your reason here............................."></textarea>
          </div>
          <div className="flex space-x-4">
            <button className="w-full bg-blue-600 text-white p-2 rounded-full" style={{ borderRadius: '70px' }}>submit</button>
            <button className="w-full bg-blue-600 text-white p-2 rounded-full" style={{ borderRadius: '70px' }}>cancel</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Appointment;