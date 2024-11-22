import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Invalid email format.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Log the successful response
                console.log("Login Response:", data);

                // Store user details and token expiry
                localStorage.setItem('userId', data.userId);
                const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds
                localStorage.setItem('tokenExpiry', expiryTime);

                // Role-based navigation
                if (data.role === 'doctor') {
                    localStorage.setItem('doctorId', data.userId);
                    toast.success('You have Successfully logged in!');
                    setTimeout(() => navigate('/doctordashboard'), 1500);
                } else if (data.role === 'patient') {
                    toast.success('You have Successfully logged in!');
                    setTimeout(() => navigate('/patientdashboard'), 1500);
                } else if (data.role === 'admin') {
                    toast.success('Successfully logged Admin!');
                    setTimeout(() => navigate('/admindashboard'), 1500);
                } else {
                    toast.warning("Unknown role. Redirecting to home.");
                    navigate('/');
                }
            } else {
                toast.error(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello! <span className="text-primaryColor">Welcome</span> Back
                </h3>

                <form className="py-4 md:py-0" onSubmit={submitHandler}>
                    <div className="mb-5">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
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
                            onChange={handleInputChange}
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
