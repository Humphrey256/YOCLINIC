import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch all doctors, patients, and appointments
    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/doctors');
            if (!response.ok) throw new Error('Failed to fetch doctors');
            const data = await response.json();
            setDoctors(data.data || []); // Ensure fallback to an empty array
        } catch (error) {
            setDoctors([]); // Prevent undefined issues
            setErrorMessage(error.message);
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/users');
            if (!response.ok) throw new Error('Failed to fetch patients');
            const data = await response.json();
            setPatients(data.data || []); // Ensure fallback to an empty array
        } catch (error) {
            setPatients([]); // Prevent undefined issues
            setErrorMessage(error.message);
            console.error('Error fetching patients:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/bookings');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            setAppointments(data.data || []); // Ensure fallback to an empty array
        } catch (error) {
            setAppointments([]); // Prevent undefined issues
            setErrorMessage(error.message);
            console.error('Error fetching appointments:', error);
        }
    };

    // Handle doctor actions (approve/reject)
    const handleDoctorAction = async (doctorId, action) => {
        try {
            const method = action === 'reject' ? 'DELETE' : 'PATCH';
            const updatedStatus = action === 'approve' ? 'confirmed' : 'rejected';
            const response = await fetch(`http://localhost:5000/api/v1/doctors/${action}/${doctorId}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isApproved: updatedStatus }),
            });

            if (response.ok) {
                toast.success(`Doctor ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
                setDoctors((prevDoctors) =>
                    prevDoctors.map((doctor) =>
                        doctor._id === doctorId ? { ...doctor, isApproved: updatedStatus } : doctor
                    )
                );
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to perform action');
                toast.error(errorData.message || 'Failed to perform action');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error handling doctor action:', error);
        }
    };

    // Handle appointment actions (approve/reject)
    const handleAppointmentAction = async (appointmentId, action) => {
        try {
            const updatedStatus = action === 'approve' ? 'confirmed' : 'rejected';
            const response = await fetch(`http://localhost:5000/api/v1/bookings/${action}/${appointmentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: updatedStatus }),
            });

            if (response.ok) {
                toast.success(`Appointment ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
                setAppointments((prevAppointments) =>
                    prevAppointments.map((booking) =>
                        booking._id === appointmentId ? { ...booking, status: updatedStatus } : booking
                    )
                );
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to perform action');
                toast.error(errorData.message || 'Failed to perform action');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error handling booking action:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchDoctors();
        fetchPatients();
        fetchAppointments();
    }, []);

    return (
        <section className="flex justify-center p-5">
            <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-blue-500">Admin Dashboard</h2>

                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                {/* Doctors Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Doctor Management</h3>
                    {doctors?.length > 0 ? (
                        <div className="space-y-4">
                            {doctors.map((doctor) => (
                                <div key={doctor._id} className="border p-4 rounded-lg shadow-sm">
                                    <img
                                        src={`http://localhost:5000/${doctor.photo?.replace(/\\/g, '/')}`}
                                        alt={`${doctor.name}'s profile`}
                                        className="w-24 h-24 rounded-full mb-3"
                                    />
                                    <p><strong>Name:</strong> {doctor.name}</p>
                                    <p><strong>Email:</strong> {doctor.email || 'N/A'}</p>
                                    <p><strong>Qualifications:</strong></p>
                                    <ul className="list-disc list-inside ml-4">
                                        {Array.isArray(doctor.qualifications) && doctor.qualifications.length > 0 ? (
                                            doctor.qualifications.map((qual, index) => <li key={index}>{qual}</li>)
                                        ) : (
                                            <li>No qualifications listed</li>
                                        )}
                                    </ul>
                                    <p><strong>Status:</strong> {doctor.isApproved === 'confirmed' ? 'Confirmed' : 'Pending'}</p>

                                    {doctor.isApproved !== 'confirmed' && (
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                onClick={() => handleDoctorAction(doctor._id, 'approve')}
                                                className="p-2 rounded bg-green-500 text-white hover:bg-green-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleDoctorAction(doctor._id, 'reject')}
                                                className="p-2 rounded bg-red-500 text-white hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No doctors available.</p>
                    )}
                </div>

                {/* Patients Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Patient Management</h3>
                    {patients?.length > 0 ? (
                        <div className="space-y-4">
                            {patients.map((user) => (
                                <div key={user._id} className="border p-4 rounded-lg shadow-sm">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                                    <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No patients available.</p>
                    )}
                </div>

                {/* Appointments Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Appointment Management</h3>
                    {appointments?.length > 0 ? (
                        <div className="space-y-4">
                            {appointments.map((booking) => (
                                <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
                                    <p><strong>Patient:</strong> {booking.patientName}</p>
                                    <p><strong>Doctor:</strong> {booking.doctorName}</p>
                                    <p><strong>Reason:</strong> {booking.reason}</p>
                                    <p><strong>Status:</strong> {booking.status}</p>

                                    {booking.status !== 'confirmed' && (
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                onClick={() => handleAppointmentAction(booking._id, 'approve')}
                                                className="p-2 rounded bg-green-500 text-white hover:bg-green-700"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleAppointmentAction(booking._id, 'reject')}
                                                className="p-2 rounded bg-red-500 text-white hover:bg-red-700"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No appointments available.</p>
                    )}
                </div>
            </div>

            <ToastContainer />
        </section>
    );
};

export default AdminDashboard;
