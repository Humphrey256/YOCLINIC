import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        if (token && tokenExpiry) {
            if (Date.now() > tokenExpiry) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                localStorage.removeItem('doctorId');
                localStorage.removeItem('tokenExpiry');
                toast.error("Session expired. Please log in again.");
                navigate('/login');
            } else {
                const role = localStorage.getItem('role');
                const dashboardRoutes = {
                    doctor: '/doctordashboard',
                    patient: '/patientdashboard',
                    admin: '/admindashboard',
                };
                navigate(dashboardRoutes[role] || '/');
            }
        }

        const intervalId = setInterval(() => {
            const tokenExpiry = localStorage.getItem('tokenExpiry');
            if (tokenExpiry && Date.now() > tokenExpiry) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                localStorage.removeItem('doctorId');
                localStorage.removeItem('tokenExpiry');
                toast.error("Session expired. Please log in again.");
                navigate('/login');
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('API response:', data); // Debugging line
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userId', data.userId);
                if (data.role === 'doctor') {
                    localStorage.setItem('doctorId', data.doctorId);
                    console.log('doctorId set:', data.doctorId); // Debugging line
                }
                localStorage.setItem('tokenExpiry', new Date().getTime() + 3600000);

                login(data);

                const dashboardRoutes = {
                    doctor: '/doctordashboard',
                    patient: '/patientdashboard',
                    admin: '/admindashboard',
                };
                navigate(dashboardRoutes[data.role] || '/');
                toast.success('Login successful!');
            } else {
                toast.error(data.message || 'Login failed!');
            }
        } catch (error) {
            toast.error('Login failed!');
        }
    };

    return (
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello! <span className="text-primaryColor">Welcome</span> Back
                </h3>

                <form className="py-4 md:py-0" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full py-3 px-4 border border-solid border-[#0066ff61] rounded-lg focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-black placeholder:text-gray-400 placeholder:opacity-100 cursor-pointer"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password Here"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full py-3 px-4 border border-solid border-[#0066ff61] rounded-lg focus:outline-none focus:border-primaryColor text-[16px] leading-7 text-black placeholder:text-gray-400 placeholder:opacity-100 cursor-pointer"
                            required
                        />
                    </div>
                    <div className="mb-5 flex items-center">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            id="showPassword"
                            className="mr-2"
                        />
                        <label htmlFor="showPassword" className="text-gray-500">Show Password</label>
                    </div>
                    <div className="mt-7">
                        <button
                            type="submit"
                            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                            Login
                        </button>
                    </div>
                    <p className="mt-5 text-textColor text-center">
                        Don&apos;t have an account?
                        <Link to='/register' className='text-primaryColor font-medium ml-1'>
                            Register
                        </Link>
                    </p>
                </form>
            </div>

            <ToastContainer />
        </section>
    );
};

export default Login;
