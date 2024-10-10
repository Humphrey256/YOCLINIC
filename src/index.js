import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Registration from './registration';
import Login from './login';
import Services from './services';
import Appointment from './appointment';
import { Toaster } from 'react-hot-toast'; // or the correct library you're using
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome styles

ReactDOM.render(
  <BrowserRouter>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Routes>
      <Route path="/" element={<App />} exact />
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);