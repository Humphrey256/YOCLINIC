import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const PatientDashboard = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        phoneNumber: '',
        time: '',
        reason: '',
        doctorId: '',
        userId: '',
        status: 'Pending', // Add status field with default value
    });

    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [appointmentStatus, setAppointmentStatus] = useState('');
    const [submittedDetails, setSubmittedDetails] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [medicalDocuments, setMedicalDocuments] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    const fetchDoctors = useCallback(async () => {
        try {
            const response = await fetch('https://yoclinic.onrender.com/api/v1/doctors', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch doctors');

            const data = await response.json();
            console.log('Fetched doctors:', data); // Log the fetched data

            const confirmedDoctors = data.data.filter((doctor) => doctor.isApproved === 'confirmed');
            setDoctors(confirmedDoctors);

            if (confirmedDoctors.length > 0) {
                setSelectedDoctor(confirmedDoctors[0]);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    doctorId: confirmedDoctors[0]._id,
                }));
                fetchTimeSlots(confirmedDoctors[0]._id);
            }
        } catch (error) {
            toast.error('Failed to fetch doctors. Please try again.', { position: 'top-right' });
        }
    }, []);

    const fetchTimeSlots = async (doctorId) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/doctors/timeSlots/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTimeSlots(data.timeSlots || []);
            } else {
                toast.error('Failed to fetch available time slots.', { position: 'top-right' });
            }
        } catch (error) {
            toast.error('Error fetching time slots. Please try again.', { position: 'top-right' });
        }
    };

    const fetchMedicalHistory = async (userId) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/patients/history/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMedicalHistory(data.history);
                toast.success('Medical history fetched successfully!', { position: 'top-right' });
            } else {
                throw new Error('Failed to fetch medical history.');
            }
        } catch (error) {
            toast.error('Error fetching medical history. Please try again.', { position: 'top-right' });
        }
    };

    const fetchMedicalDocuments = async (userId) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/patients/documents/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setMedicalDocuments(data.documents);
                toast.success('Medical documents fetched successfully!', { position: 'top-right' });
            } else {
                throw new Error('Failed to fetch medical documents.');
            }
        } catch (error) {
            toast.error('Error fetching medical documents. Please try again.', { position: 'top-right' });
        }
    };


    const fetchNotifications = async (userId) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/patients/notifications/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data.notifications);
                toast.success('Notifications fetched successfully!', { position: 'top-right' });
            } else {
                throw new Error('Failed to fetch notifications.');
            }
        } catch (error) {
            toast.error('Error fetching notifications. Please try again.', { position: 'top-right' });
        }
    };


    const fetchAppointments = async (userId) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/bookings/user/${userId}`, { // Corrected endpoint URL
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched appointments:', data.bookings); // Log the fetched appointments
                setAppointments(data.bookings || []);  // Store fetched appointments
                toast.success('Appointments fetched successfully!', { position: 'top-right' });
            } else {
                throw new Error('Failed to fetch appointments.');
            }
        } catch (error) {
            toast.error('Error fetching appointments. Please try again.', { position: 'top-right' });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            navigate('/login');
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, userId }));
            fetchDoctors();
            fetchMedicalHistory(userId);
            fetchMedicalDocuments(userId);
            fetchNotifications(userId);
            fetchAppointments(userId);  // Fetch appointments on mount
        }
    }, [fetchDoctors, navigate]);

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setFormData({
            ...formData,
            doctorId: doctor._id,
        });
        fetchTimeSlots(doctor._id);
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (submittedDetails) {
                // If editing an existing appointment
                response = await fetch(`https://yoclinic.onrender.com/api/v1/bookings`, {
                    method: 'PUT',  // Use PUT for update
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // If creating a new appointment
                response = await fetch('https://yoclinic.onrender.com/api/v1/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                const bookingData = await response.json();
                setSubmittedDetails(bookingData);
                setFormData({
                    patientName: '',
                    phoneNumber: '',
                    time: '',
                    reason: '',
                    doctorId: '',
                    userId: formData.userId,
                    status: 'Pending', // Reset status to default
                });
                setErrorMessage('');
                setAppointmentStatus('Success');
                toast.success(submittedDetails ? 'Appointment updated successfully!' : 'Appointment booked successfully!');

                // Fetch the updated list of appointments
                fetchAppointments(formData.userId);

                setTimeout(() => {
                    navigate('/patientdashboard');
                }, 3000);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to submit appointment');
                setAppointmentStatus('Failed');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            setAppointmentStatus('Failed');
        }
    };

    const handleAppointmentCancel = async (appointmentId) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/bookings/cancel/${appointmentId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                toast.success('Appointment canceled successfully.');
                fetchMedicalHistory();  // Reload medical history
            } else {
                toast.error('Failed to cancel appointment.');
            }
        } catch (error) {
            toast.error('Error canceling appointment.');
        }
    };
    const handleEditAppointment = (appointment) => {
        setFormData({
            patientName: appointment.patientName,
            phoneNumber: appointment.phoneNumber,
            time: appointment.time._id, // Assuming time is an object with _id
            reason: appointment.reason,
            doctorId: appointment.doctor._id, // Assuming doctor is an object with _id
            userId: appointment.userId,
            status: appointment.status,
        });
        setSubmittedDetails(appointment);
        setAppointmentStatus('Editing');
    };

    return (
        <section className="flex justify-center">
            <div className="flex flex-col md:flex-row w-full max-w-6xl p-5 space-y-4 md:space-x-4">
                {/* Notifications, Medical History and Documents Section */}
                <div className="w-full md:w-1/2 p-5">
                    <h2 className="font-bold text-lg mb-4 text-blue-500">Notifications</h2>
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <div key={index} className="p-4 border-2 rounded-lg mb-4">
                                <p>{notification.message}</p>
                            </div>
                        ))
                    ) : (
                        <p>No notifications available.</p>
                    )}

                    <h2 className="font-bold text-lg mb-4 text-blue-500">Medical History</h2>
                    {medicalHistory.length > 0 ? (
                        medicalHistory.map((record, index) => (
                            <div key={index} className="p-4 border-2 rounded-lg mb-4">
                                <p><strong>Date:</strong> {record.date}</p>
                                <p><strong>Reason:</strong> {record.reason}</p>
                                <p><strong>Doctor:</strong> {record.doctorName}</p>
                                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                            </div>
                        ))
                    ) : (
                        <p>No medical history available.</p>
                    )}

                    <h2 className="font-bold text-lg mb-4 text-blue-500">Medical Documents</h2>
                    {medicalDocuments.length > 0 ? (
                        medicalDocuments.map((doc, index) => (
                            <div key={index} className="p-4 border-2 rounded-lg mb-4">
                                <p><strong>Title:</strong> {doc.title}</p>
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">View Document</a>
                            </div>
                        ))
                    ) : (
                        <p>No medical documents available.</p>
                    )}
                    <h2 className="font-bold text-lg mb-4 text-blue-500">My Appointments</h2>
{appointments.length > 0 ? (
    <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
            <thead>
                <tr>
                    <th className="px-4 py-2 border-b text-left">Doctor</th>
                    <th className="px-4 py-2 border-b text-left">Reason</th>
                    <th className="px-4 py-2 border-b text-left">Time</th>
                    <th className="px-4 py-2 border-b text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border-b">Dr.{appointment.doctor?.name || 'N/A'}</td>
                        <td className="px-4 py-2 border-b">{appointment.reason || 'N/A'}</td>
                        <td className="px-4 py-2 border-b">
                            {appointment.time ? `${appointment.time.day} from ${appointment.time.startTime} to ${appointment.time.endTime}` : 'N/A'}
                        </td>
                        <td className="px-4 py-2 border-b">
    <span
        onClick={() => handleEditAppointment(appointment)}
        className="text-blue-500 cursor-pointer mr-4">
        Edit
    </span>
    <span
        onClick={() => handleAppointmentCancel(appointment._id)}
        className="text-red-500 cursor-pointer">
        Cancel
    </span>
</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
) : (
    <p>No appointments available.</p>
)}

                </div>

                {/* Appointment Booking Form Section */}
                <div className="w-full md:w-1/2 p-5">
                    <h2 className="font-bold text-lg mb-4 text-blue-500">
                        {appointmentStatus === 'Editing' ? 'Edit Appointment' : 'Book an Appointment'}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Doctor Selection */}
                        <div className="mb-4">
                            <div className="w-full overflow-x-auto">
                                <div className="flex space-x-6 p-4">
                                    {doctors.map((doctor) => (
                                        <div
                                            key={doctor._id}
                                            className={`w-80 min-w-[300px] p-6 border-2 rounded-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 bg-gray-200 flex flex-col items-center text-center shadow-md ${selectedDoctor && selectedDoctor._id === doctor._id ? 'bg-yellow-300' : ''}`}
                                            onClick={() => handleDoctorSelect(doctor)}
                                        >
                                            {/* Circular Image */}
                                            <div className="w-44 h-44 bg-blue-300 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                                                <img
                                                    src={doctor.photo ? `https://yoclinic.onrender.com/${doctor.photo}` : 'https://yoclinic.onrender.com/uploads/default-image.jpg'}
                                                    alt={doctor.name || 'Doctor'}
                                                    className="w-40 h-40 rounded-full object-cover"
                                                />
                                            </div>

                                            {/* Doctor Details */}
                                            <h3 className="text-xl font-bold text-blue-700">Dr. {doctor.name}</h3>
                                            <p className="text-lg font-semibold text-blue-700">Specialty: {doctor.specialization || 'N/A'}</p>
                                            <p className="text-lg font-semibold text-blue-700">Hospital: {doctor.hospital || 'N/A'}</p>

                                            {/* Star Rating */}
                                            <div className="flex justify-center mt-2 text-yellow-400 text-xl">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={`fa fa-star ${i < (doctor.averageRating || 0) ? 'text-yellow-400' : 'text-gray-400'}`}></span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Form Inputs */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Phone Number</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>

                        {/* Time Slot Selection */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Select Time</label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            >
                                <option value="">Select a Time Slot</option>
                                {timeSlots.map((slot, index) => (
                                    <option key={index} value={slot._id}>
                                        {`${slot.day} from ${slot.startTime} to ${slot.endTime}`} {/* Render slot properties */}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Reason for Visit */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Reason for Visit</label>
                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">
                            {appointmentStatus === 'Editing' ? 'Update Appointment' : 'Submit Appointment'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast Container for Notifications */}
            <ToastContainer />
        </section>
    );
};

export default PatientDashboard;