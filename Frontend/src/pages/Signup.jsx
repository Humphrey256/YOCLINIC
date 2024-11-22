import { useState } from 'react';
import avatar from '../assets/images/doctor1.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photo: null,
        gender: '',
        role: 'patient',
    });
    const [previewURL, setPreviewURL] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file });
            const url = URL.createObjectURL(file);
            setPreviewURL(url);
        }
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('password', formData.password);
        formDataToSubmit.append('photo', formData.photo); // Photo is appended here
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('role', formData.role);

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                body: formDataToSubmit,
            });

            if (response.ok) {
                toast.success("Registration successful!");
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <section className='px-5 xl:px-0'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='py-10 px-5 rounded-lg shadow-md w-full max-w-md'>
                    <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 text-center'>
                        <span className='text-primaryColor'>Register</span>
                    </h3>

                    <form onSubmit={submitHandler}>
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pr-4 py-3 border border-solid border-[#0066ff61] rounded-lg focus:outline-none focus:border-primaryColor text-black text-[16px] leading-7 placeholder:text-gray-500 cursor-pointer"
                                required
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pr-4 py-3 border border-solid border-[#0066ff61] rounded-lg focus:outline-none focus:border-primaryColor text-black text-[16px] leading-7 placeholder:text-gray-500 cursor-pointer"
                                required
                            />
                        </div>
                        <div className="mb-5 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pr-10 py-3 border border-solid border-[#0066ff61] rounded-lg focus:outline-none focus:border-primaryColor text-black text-[16px] leading-7 placeholder:text-gray-500 cursor-pointer"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <div className='mb-5'>
                            <label className='text-headingColor font-bold text-[16px] leading-7 mb-2 block'>
                                Are You A:
                            </label>
                            <select
                                name='role'
                                value={formData.role}
                                onChange={handleInputChange}
                                className='w-full text-black font-semibold text-[15px] leading-7 px-4 py-3 border border-solid border-[#0066ff61] rounded-lg focus:outline-none'
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
                        <div className='mb-5'>
                            <label className='text-headingColor font-bold text-[16px] leading-7 mb-2 block'>
                                Gender:
                            </label>
                            <select
                                name='gender'
                                value={formData.gender}
                                onChange={handleInputChange}
                                className='w-full text-black font-semibold text-[15px] leading-7 px-4 py-3 border border-solid border-[#0066ff61] rounded-lg focus:outline-none'
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className='mb-5 flex items-center gap-3'>
                            <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                                {previewURL ? (
                                    <img src={previewURL} alt="" className='w-full rounded-full' />
                                ) : (
                                    <img src={avatar} alt="" className='w-full rounded-full' />
                                )}
                            </figure>
                            <div className='relative w-[130px] h-[50px]'>
                                <input
                                    type="file"
                                    name="photo"
                                    id="customFile"
                                    onChange={handleFileInputChange}
                                    accept='.jpg, .png, .jpeg'
                                    className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                />
                                <label
                                    htmlFor="customFile"
                                    className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                                >
                                    Upload Photo
                                </label>
                            </div>
                        </div>
                        <div className="mt-7">
                            <button
                                type="submit"
                                className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                                Click to Register
                            </button>
                        </div>
                        <p className="mt-5 text-textColor text-center">
                            Already have an account?
                            <Link to='/login' className='text-primaryColor font-medium ml-1'>
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </section>
    );
};

export default Signup;
