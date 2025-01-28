import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        photo: null,
        gender: '',
        role: 'patient',
    });
    const [previewURL, setPreviewURL] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, photo: file });
        setPreviewURL(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await fetch('https://yoclinic.onrender.com/api/v1/auth/register', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success('Signup successful!');
                navigate('/login');
            } else {
                toast.error(data.message || 'Signup failed!');
            }
        } catch (error) {
            toast.error('Signup failed!');
        }
    };

    return (
        <section className='px-5 xl:px-0'>
             <ToastContainer />
            <div className='flex items-center justify-center min-h-screen'>
                <div className='py-10 px-5 rounded-lg shadow-md w-full max-w-md'>
                    <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 text-center'>
                        <span className='text-primaryColor'>Register</span>
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-sm text-blue-500 mt-2"
                            >
                                {showPassword ? 'Hide' : 'Show'} Password
                            </button>
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-5">
                            <input
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded-md"
                            />
                            {previewURL && <img src={previewURL} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-full" />}
                        </div>
                        <div className="mb-5">
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                            Signup
                        </button>
                        <p className="mt-5 text-center">
                            Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Signup;
