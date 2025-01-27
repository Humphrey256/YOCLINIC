import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Icon import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slots from '../../components/Slots'; // Import the Slots component

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorProfile, setDoctorProfile] = useState({
        name: '',
        email: '',
        qualifications: '',
        location: '',
        specialization: '',
        hospital: ''
    });

    useEffect(() => {
        fetchAppointments();
        fetchDoctorProfile();
    }, []);
    
    const fetchAppointments = () => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            toast.error("Doctor ID not found. Please log in again.");
            return;
        }

        fetch(`http://localhost:5000/api/v1/bookings/doctor/${doctorId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Appointments:", data.bookings);
                setAppointments(data.bookings || []);
                toast.success("Appointments fetched successfully!");
            })
            .catch((error) => toast.error("Error fetching appointments."));
    };

    const fetchDoctorProfile = () => {
        const doctorId = localStorage.getItem('doctorId');
        fetch(`http://localhost:5000/api/v1/doctors/${doctorId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((data) => {
                setDoctorProfile(data);
                toast.success("Doctor profile fetched successfully!");
            })
            .catch((error) => toast.error("Error fetching doctor profile."));
    };

    const handleProfileUpdate = () => {
        const doctorId = localStorage.getItem('doctorId');
        fetch(`http://localhost:5000/api/v1/doctors/update/${doctorId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(doctorProfile)
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Profile updated successfully!");
                    fetchDoctorProfile(); // Fetch the updated profile
                } else {
                    toast.error("Failed to update profile.");
                }
            })
            .catch((error) => toast.error("Error updating profile."));
    };

    const confirmAppointment = (appointmentId) => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            toast.error("Doctor ID not found. Please log in again.");
            return;
        }

        fetch(`http://localhost:5000/api/v1/bookings/confirm/${appointmentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId, status: 'Confirmed' })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Appointment confirmed successfully.");
                    setAppointments(appointments.map((appointment) =>
                        appointment._id === appointmentId ? { ...appointment, status: 'Confirmed' } : appointment
                    ));
                } else {
                    toast.error("Failed to confirm the appointment.");
                }
            })
            .catch((error) => toast.error("Error confirming appointment."));
    };

    const cancelAppointment = (appointmentId) => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            toast.error("Doctor ID not found. Please log in again.");
            return;
        }

        fetch(`http://localhost:5000/api/v1/bookings/cancel/${appointmentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId, status: 'canceled' })
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Appointment canceled successfully.");
                    setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
                } else {
                    toast.error("Failed to cancel the appointment.");
                }
            })
            .catch((error) => toast.error("Error canceling appointment."));
    };

    const groupAppointmentsByDatePlaced = (appointments) => {
        return appointments.reduce((grouped, appointment) => {
            const appointmentDate = appointment.createdAt ? new Date(appointment.createdAt).toISOString().split('T')[0] : 'Unknown Date';
            if (!grouped[appointmentDate]) {
                grouped[appointmentDate] = [];
            }
            grouped[appointmentDate].push(appointment);
            return grouped;
        }, {});
    };

    const groupedAppointments = groupAppointmentsByDatePlaced(appointments);

    return (
        <section className="relative flex flex-col items-center p-5 space-y-8">
            <ToastContainer />
            <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-blue-500">Doctor Dashboard</h2>

                {/* Profile Update Section */}
                <div className="mb-4 p-4 bg-white rounded-md shadow-md">
                    <h3 className="text-xl font-semibold text-blue-500">Doctor Profile</h3>
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-4xl text-blue-500" />
                        <div>
                            <p className="text-xl font-semibold">{doctorProfile.name}</p>
                            <p className="text-sm text-gray-500">{doctorProfile.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4 mt-4">
                        <input
                            type="text"
                            placeholder="Qualifications"
                            value={doctorProfile.qualifications || ''}
                            onChange={(e) => setDoctorProfile({ ...doctorProfile, qualifications: e.target.value })}
                            className="p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={doctorProfile.location || ''}
                            onChange={(e) => setDoctorProfile({ ...doctorProfile, location: e.target.value })}
                            className="p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Specialization"
                            value={doctorProfile.specialization || ''}
                            onChange={(e) => setDoctorProfile({ ...doctorProfile, specialization: e.target.value })}
                            className="p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Hospital"
                            value={doctorProfile.hospital || ''}
                            onChange={(e) => setDoctorProfile({ ...doctorProfile, hospital: e.target.value })}
                            className="p-2 border rounded-md"
                        />
                        <button
                            onClick={handleProfileUpdate}
                            className="bg-blue-500 text-white p-2 rounded-md mt-2"
                        >
                            Update Profile
                        </button>
                    </div>
                </div>

                {/* Available Slots Section */}
                <Slots />

                {/* Appointments Section */}
                {Object.keys(groupedAppointments).map((date) => (
                    <div key={date} className="p-4 bg-white rounded-md shadow-md mt-4">
                        <h3 className="text-xl font-semibold text-blue-500">Appointments placed on {date}</h3>
                        {groupedAppointments[date].length > 0 ? (
                            <div className="overflow-x-auto"> {/* Make table scrollable horizontally */}
                                <table className="min-w-full bg-white table-auto">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Patient Name</th>
                                            <th className="py-2">Reason</th>
                                            <th className="py-2">Time</th>
                                            <th className="py-2">Phone Number</th>
                                            <th className="py-2">Status</th>
                                            <th className="py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedAppointments[date].map((appointment) => {
                                            return (
                                                <tr key={appointment._id}>
                                                    <td className="border px-4 py-2">{appointment.patientName}</td>
                                                    <td className="border px-4 py-2">{appointment.reason}</td>
                                                    <td className="border px-4 py-2">{appointment.time ? `${appointment.time.day} ${appointment.time.startTime} - ${appointment.time.endTime}` : "N/A"}</td>
                                                    <td className="border px-4 py-2">{appointment.phoneNumber}</td>
                                                    <td className="border px-4 py-2">{appointment.status}</td>
                                                    <td className="border px-4 py-2">
                                                        {appointment.status === 'Pending' ? (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => confirmAppointment(appointment._id)}
                                                                    className="text-green-500"
                                                                >
                                                                    Confirm
                                                                </button>
                                                                <button
                                                                    onClick={() => cancelAppointment(appointment._id)}
                                                                    className="text-red-500 ml-2"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400">N/A</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-4">No appointments available for this date.</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DoctorDashboard;
