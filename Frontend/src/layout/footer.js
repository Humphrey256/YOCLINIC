import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css'; // Tailwind CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles


function Footer() {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-4">
      <nav className="space-x-4 mb-4">
        <a href="#" className="nav-link hover:underline">About us</a>
        <a href="#" className="nav-link hover:underline">Contact us</a>
        <a href="#" className="nav-link hover:underline">Location</a>
        <a href="#" className="nav-link hover:underline">Help</a>
        <a href="#" className="nav-link hover:underline">FAQ</a>
      </nav>
      <div className="space-x-4">
        <a href="#" className="social-icon text-pink-500"><i className="fab fa-instagram fa-2x"></i></a>
        <a href="#" className="social-icon text-blue-500 mx-4"><i className="fab fa-twitter fa-2x"></i></a>
        <a href="#" className="social-icon text-blue-500 mx-4"><i className="fab fa-facebook fa-2x"></i></a>
        <a href="#" className="social-icon text-green-500 mx-4"><i className="fab fa-whatsapp fa-2x"></i></a>
      </div>
    </footer>
  );
}

export default Footer;