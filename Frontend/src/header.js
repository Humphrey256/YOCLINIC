import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css'; // Tailwind CSS styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles


function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="./yoclinic/logo.WEBP" alt="YOCLINIC Logo" className="w-10 h-10"  class="logo"/>
        <div className="text-2xl font-bold">YOCLINIC</div>
      </div>
      <div className="menu-icon md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars fa-2x"></i>
      </div>
      <nav className="nav-links space-x-4 hidden md:flex">
        <a href="#" className="nav-link hover:underline">Home</a>
        <a href="#" className="nav-link hover:underline">Services</a>
        <a href="#" className="nav-link hover:underline">News</a>
        <div className="dropdown">
          <a href="#" className="nav-link dropbtn hover:underline"><i className="fas fa-caret-down"></i> Accounts</a>
          <div className="dropdown-content">
            <a href="#">Patient History</a>
            <a href="#">Login</a>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-menu md:hidden">
          <nav className="flex flex-col items-center">
            <a href="index.html" className="nav-link hover:underline">Home</a>
            <a href="services.html" className="nav-link hover: underline">Services</a>
            <a href="#" className="nav-link hover:underline">News</a>
            <div className="dropdown">
              <a href="#" className="nav-link dropbtn hover:underline"><i className="fas fa-caret-down "></i> Accounts</a>
              <div className="dropdown-content">
                <a href="registration.html">signup</a>
                <a href="login.html">Login</a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;