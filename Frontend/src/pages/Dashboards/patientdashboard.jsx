import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import io from 'socket.io-client'; // Import socket.io-client
import 'react-toastify/dist/ReactToastify.css';

const PatientDashboard = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        phoneNumber: '',
        appointmentDate: '',
        time: '',
        reason: '',
        doctorId: '',
        userId: '', // Add userId here to hold the patient ID
    });
    const [doctors, setDoctors] = useState([]);
    const [submittedDetails, setSubmittedDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [appointmentStatus, setAppointmentStatus] = useState('pending'); // Added status
    const navigate = useNavigate();

    const socket = useRef(null); // Use ref to persist the socket connection across renders

    // Fetch the list of doctors from the backend
    const fetchDoctors = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/doctors', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 401) {
                setErrorMessage('Session expired. Please log in again.');
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                navigate('/login'); // Redirect to login if token is invalid
                return;
            }

            if (!response.ok) throw new Error('Failed to fetch doctors');

            const data = await response.json();
            if (Array.isArray(data.data)) {
                // Filter doctors with confirmed status
                const confirmedDoctors = data.data.filter((doctor) => doctor.isApproved === 'confirmed');
                setDoctors(confirmedDoctors);
                if (confirmedDoctors.length > 0) {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        doctorId: confirmedDoctors[0]._id,
                    }));
                }
            } else {
                throw new Error('Invalid data format');
            }
        } catch (error) {
            toast.error('Failed to fetch doctors. Please try again.', { position: 'top-center' });
        }
    }, [navigate]);

    // Set patient ID and check token on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

        if (!token || !userId) {
            navigate('/login'); // Redirect if no token or userId exists
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, userId })); // Set userId in form data
            fetchDoctors();
        }

        // Set up socket connection
        socket.current = io('http://localhost:3000'); // Initialize socket

        // Listen for real-time booking status updates
        socket.current.on('appointment-status-update', (data) => {
            if (data.userId === formData.userId) { // Only update for this patient
                setAppointmentStatus(data.status); // Update status
                toast.success(`Your appointment status is now ${data.status}`);
            }
        });

        // Cleanup function to disconnect socket and remove event listener on unmount
        return () => {
            if (socket.current) {
                socket.current.off('appointment-status-update'); // Remove listener
                socket.current.disconnect(); // Disconnect socket
            }
        };
    }, [fetchDoctors, navigate, formData.userId]);

    // Handle form field changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle doctor selection
    const handleDoctorSelect = (doctorId) => {
        setFormData({
            ...formData,
            doctorId: doctorId,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        if (!userId) {
            setErrorMessage('User not authenticated.');
            return;
        }

        const formDataWithUserId = {
            ...formData,
            userId, // Add userId to the form data
        };

        try {
            const response = await fetch('http://localhost:5000/api/v1/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formDataWithUserId),
            });

            if (response.ok) {
                setSubmittedDetails(formDataWithUserId);
                setFormData({
                    patientName: '',
                    phoneNumber: '',
                    appointmentDate: '',
                    time: '',
                    reason: '',
                    doctorId: doctors.length > 0 ? doctors[0]._id : '',
                    userId,
                });
                setErrorMessage('');
                toast.success('Appointment booked successfully!');
                setTimeout(() => {
                    navigate('/patientdashboard');
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit appointment');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    // Handle editing submitted appointment
    const handleEdit = () => {
        if (submittedDetails) {
            setFormData(submittedDetails); // Pre-populate form with submitted details
        }
    };

    // Handle canceling the form
    const handleCancel = () => {
        const userId = localStorage.getItem('userId');
        setSubmittedDetails(null); // Clear submitted details
        setFormData({
            patientName: '',
            phoneNumber: '',
            appointmentDate: '',
            time: '',
            reason: '',
            doctorId: doctors.length > 0 ? doctors[0]._id : '',
            userId, // Reset userId field
        });
    };

    return (
        <section className="flex justify-center">
            <div className="flex flex-col md:flex-row w-full max-w-6xl p-5 space-y-4 md:space-x-4">
                {/* Left Section: Book Appointment */}
                <div className="w-full md:w-1/2 p-5">
                    <h2 className="font-bold text-lg mb-4 text-blue-500">Book Appointment</h2>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Patient Name"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-blue-500 rounded placeholder-black"
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-blue-500 rounded placeholder-black"
                            required
                        />
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Select a Doctor</h3>
                            {doctors.length > 0 ? (
                                <div className="flex overflow-x-auto space-x-4">
                                    {doctors.map((doctor) => (
                                        <div
                                            key={doctor._id}
                                            onClick={() => handleDoctorSelect(doctor._id)}
                                            className={`cursor-pointer p-4 border-2 border-blue-500 rounded-lg flex-none w-64 ${formData.doctorId === doctor._id ? 'bg-blue-500 text-white' : ''}`}
                                        >
                                            <img
                                                src={`http://localhost:5000/${doctor.photo}`} // Assuming the photo URL path
                                                alt={doctor.name}
                                                className="w-20 h-20 rounded-full object-cover"
                                            />
                                            <div className="ml-4">
                                                <p className="font-bold">{doctor.name}</p>
                                                <p>{doctor.qualifications.join(', ')}</p>
                                                <p>{doctor.location}</p> {/* Add location */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No doctors available</p>
                            )}
                        </div>
                        <input
                            type="date"
                            placeholder="Appointment Date"
                            name="appointmentDate"
                            value={formData.appointmentDate}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-blue-500 rounded placeholder-black"
                            required
                        />
                        <input
                            type="time"
                            placeholder="Time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-blue-500 rounded placeholder-black"
                            required
                        />
                        <textarea
                            placeholder="Reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            className="w-full p-2 border-2 border-blue-500 rounded placeholder-black"
                            required
                        />
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
                    </form>
                </div>

                {/* Right Section: Submitted Details */}
                <div className="w-full md:w-1/2 p-5">
                    <h2 className="font-bold text-lg mb-4 text-blue-500">Submitted Appointment Details</h2>
                    {submittedDetails ? (
                        <div className="space-y-4">
                            <p><strong>Patient:</strong> {submittedDetails.patientName}</p>
                            <p><strong>Phone:</strong> {submittedDetails.phoneNumber}</p>
                            <p><strong>Date:</strong> {submittedDetails.appointmentDate}</p>
                            <p><strong>Time:</strong> {submittedDetails.time}</p>
                            <p><strong>Reason:</strong> {submittedDetails.reason}</p>
                            <p><strong>Doctor:</strong> {doctors.find((doctor) => doctor._id === submittedDetails.doctorId)?.name}</p>
                            <p><strong>Status:</strong> {appointmentStatus}</p>
                            <button
                                onClick={handleEdit}
                                className="p-2 bg-blue-500 text-white rounded mt-4"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleCancel}
                                className="p-2 bg-red-500 text-white rounded mt-4"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <p>No appointment booked yet.</p>
                    )}
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </section>
    );
};

export default PatientDashboard;
