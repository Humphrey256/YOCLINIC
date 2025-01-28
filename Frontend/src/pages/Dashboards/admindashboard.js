import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState({ doctors: false, patients: false, appointments: false });
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDoctor, setCurrentDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        specialization: '',
        hospital: '',
        qualifications: '',
        photo: '',
    });

    // Fetch all doctors, patients, and appointments
    const fetchDoctors = async () => {
        setLoading((prev) => ({ ...prev, doctors: true }));
        try {
            const response = await fetch('https://yoclinic.onrender.com/api/v1/doctors');
            if (!response.ok) throw new Error('Failed to fetch doctors');
            const data = await response.json();
            setDoctors(data.data || []); // Ensure fallback to an empty array
        } catch (error) {
            setDoctors([]); // Prevent undefined issues
            setErrorMessage(error.message);
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading((prev) => ({ ...prev, doctors: false }));
        }
    };

    const fetchPatients = async () => {
        setLoading((prev) => ({ ...prev, patients: true }));
        try {
            const response = await fetch('https://yoclinic.onrender.com/api/v1/users');
            if (!response.ok) throw new Error('Failed to fetch patients');
            const data = await response.json();
            setPatients(data.data || []); // Ensure fallback to an empty array
        } catch (error) {
            setPatients([]); // Prevent undefined issues
            setErrorMessage(error.message);
            console.error('Error fetching patients:', error);
        } finally {
            setLoading((prev) => ({ ...prev, patients: false }));
        }
    };

    const fetchAppointments = async () => {
        setLoading((prev) => ({ ...prev, appointments: true }));
        try {
            const response = await fetch('https://yoclinic.onrender.com/api/v1/bookings');
            if (!response.ok) throw new Error('Failed to fetch appointments');
            const data = await response.json();
            setAppointments(data.data || []); // Ensure fallback to an empty array
        } catch (error) {
            setAppointments([]); // Prevent undefined issues
            setErrorMessage(error.message);
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading((prev) => ({ ...prev, appointments: false }));
        }
    };

    // Handle doctor actions (approve/reject)
    const handleDoctorAction = async (doctorId, action) => {
        if (!window.confirm(`Are you sure you want to ${action} this doctor?`)) return;
        try {
            const method = action === 'reject' ? 'DELETE' : 'PATCH';
            const updatedStatus = action === 'approve' ? 'confirmed' : 'rejected';
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/doctors/${action}/${doctorId}`, {
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
        if (!window.confirm(`Are you sure you want to ${action} this appointment?`)) return;
        try {
            const updatedStatus = action === 'approve' ? 'confirmed' : 'rejected';
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/bookings/${action}/${appointmentId}`, {
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

    // Handle adding a new doctor
    const handleAddDoctor = async (newDoctor) => {
        try {
            const response = await fetch('https://yoclinic.onrender.com/api/v1/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoctor),
            });

            if (response.ok) {
                const addedDoctor = await response.json();
                setDoctors((prevDoctors) => [...prevDoctors, addedDoctor]);
                toast.success('Doctor added successfully!');
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to add doctor');
                toast.error(errorData.message || 'Failed to add doctor');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error adding doctor:', error);
        }
    };

    // Handle editing a doctor
    const handleEditDoctor = async (doctorId, updatedDoctor) => {
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/doctors/${doctorId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDoctor),
            });

            if (response.ok) {
                const editedDoctor = await response.json();
                setDoctors((prevDoctors) =>
                    prevDoctors.map((doctor) =>
                        doctor._id === doctorId ? editedDoctor : doctor
                    )
                );
                toast.success('Doctor updated successfully!');
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to update doctor');
                toast.error(errorData.message || 'Failed to update doctor');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error updating doctor:', error);
        }
    };

    // Handle deleting a doctor
    const handleDeleteDoctor = async (doctorId) => {
        if (!window.confirm('Are you sure you want to delete this doctor?')) return;
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/doctors/${doctorId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId));
                toast.success('Doctor deleted successfully!');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to delete doctor');
                toast.error(errorData.message || 'Failed to delete doctor');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error deleting doctor:', error);
        }
    };

    // Handle deleting a patient
    const handleDeletePatient = async (patientId) => {
        if (!window.confirm('Are you sure you want to delete this patient?')) return;
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/users/${patientId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== patientId));
                toast.success('Patient deleted successfully!');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to delete patient');
                toast.error(errorData.message || 'Failed to delete patient');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error deleting patient:', error);
        }
    };

    // Handle deleting an appointment
    const handleDeleteAppointment = async (appointmentId) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;
        try {
            const response = await fetch(`https://yoclinic.onrender.com/api/v1/bookings/${appointmentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setAppointments((prevAppointments) => prevAppointments.filter((appointment) => appointment._id !== appointmentId));
                toast.success('Appointment deleted successfully!');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to delete appointment');
                toast.error(errorData.message || 'Failed to delete appointment');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred. Please try again.');
            toast.error('An unexpected error occurred. Please try again.');
            console.error('Error deleting appointment:', error);
        }
    };

    // Open modal for adding or editing doctor
    const openModal = (doctor = null) => {
        setCurrentDoctor(doctor);
        setFormData({
            name: doctor ? doctor.name : '',
            email: doctor ? doctor.email : '',
            specialization: doctor ? doctor.specialization : '',
            hospital: doctor ? doctor.hospital : '',
            qualifications: doctor ? doctor.qualifications.join(', ') : '',
            photo: doctor ? doctor.photo : '',
        });
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentDoctor(null);
        setFormData({
            name: '',
            email: '',
            specialization: '',
            hospital: '',
            qualifications: '',
            photo: '',
        });
    };

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentDoctor) {
            handleEditDoctor(currentDoctor._id, formData);
        } else {
            handleAddDoctor(formData);
        }
    };

    // Filter doctors, patients, and appointments based on search query
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredAppointments = appointments.filter((appointment) =>
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />

                <button
                    onClick={() => openModal()}
                    className="p-2 mb-4 rounded bg-blue-500 text-white hover:bg-blue-700"
                >
                    Add Doctor
                </button>
                {/* Statistics Section */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-3 text-blue-500">Statistics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-100 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-blue-700">Total Doctors</h4>
                        <p className="text-2xl font-bold text-blue-900">{doctors.length}</p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-green-700">Total Patients</h4>
                        <p className="text-2xl font-bold text-green-900">{patients.length}</p>
                    </div>
                    <div className="p-4 bg-yellow-100 rounded-lg shadow">
                        <h4 className="text-lg font-semibold text-yellow-700">Total Appointments</h4>
                        <p className="text-2xl font-bold text-yellow-900">{appointments.length}</p>
                    </div>
                </div>
            </div>

                {/* Doctors Section */}
                <div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Doctor Management</h3>
                    {loading.doctors ? (
                        <p className="text-blue-500">Loading doctors...</p>
                    ) : filteredDoctors.length > 0 ? (
                        <div className="space-y-4">
                            {filteredDoctors.map((doctor) => (
                                <div key={doctor._id} className="border p-4 rounded-lg shadow-sm">
                                    <img
                                        src={`https://yoclinic.onrender.com/${doctor.photo?.replace(/\\/g, '/')}`}
                                        alt={`${doctor.name}'s profile`}
                                        className="w-24 h-24 rounded-full mb-3"
                                    />
                                    <p className="text-blue-500"><strong>Name:</strong> {doctor.name}</p>
                                    <p className="text-blue-500"><strong>Email:</strong> {doctor.email || 'N/A'}</p>
                                    <p className="text-blue-500"><strong>Specialization:</strong> {doctor.specialization || 'N/A'}</p>
                                    <p className="text-blue-500"><strong>Hospital:</strong> {doctor.hospital || 'N/A'}</p>
                                    <p className="text-blue-500"><strong>Average Rating:</strong> {doctor.averageRating || 'N/A'}</p>
                                    <p className="text-blue-500"><strong>Qualifications:</strong></p>
                                    <ul className="list-disc list-inside ml-4 text-blue-500">
                                        {Array.isArray(doctor.qualifications) && doctor.qualifications.length > 0 ? (
                                            doctor.qualifications.map((qual, index) => <li key={index}>{qual}</li>)
                                        ) : (
                                            <li>No qualifications listed</li>
                                        )}
                                    </ul>
                                    <p className="text-blue-500"><strong>Status:</strong> {doctor.isApproved === 'confirmed' ? 'Confirmed' : 'Pending'}</p>

                                    <div className="flex space-x-4 mt-4">
                                        {doctor.isApproved !== 'confirmed' && (
                                            <>
                                                <button
                                                    onClick={() => handleDoctorAction(doctor._id, 'approve')}
                                                    className="p-2 w-32 rounded bg-green-500 text-white hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleDoctorAction(doctor._id, 'reject')}
                                                    className="p-2 w-32 rounded bg-red-500 text-white hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => openModal(doctor)}
                                            className="p-2 w-32 rounded bg-yellow-500 text-white hover:bg-yellow-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteDoctor(doctor._id)}
                                            className="p-2 w-32 rounded bg-red-500 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-blue-500">No doctors available.</p>
                    )}
                </div>

                {/* Patients Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Patient Management</h3>
                    {loading.patients ? (
                        <p className="text-blue-500">Loading patients...</p>
                    ) : filteredPatients.length > 0 ? (
                        <div className="space-y-4">
                            {filteredPatients.map((user) => (
                                <div key={user._id} className="border p-4 rounded-lg shadow-sm">
                                    <p className="text-blue-500"><strong>Name:</strong> {user.name}</p>
                                    <p className="text-blue-500"><strong>Email:</strong> {user.email || 'N/A'}</p>
                                    <p className="text-blue-500"><strong>Phone:</strong> {user.phone || 'N/A'}</p>
                                    <button
                                        onClick={() => handleDeletePatient(user._id)}
                                        className="p-2 w-32 rounded bg-red-500 text-white hover:bg-red-700 mt-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-blue-500">No patients available.</p>
                    )}
                </div>

                {/* Appointments Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-3 text-blue-500">Appointment Management</h3>
                    {loading.appointments ? (
                        <p className="text-blue-500">Loading appointments...</p>
                    ) : filteredAppointments.length > 0 ? (
                        <div className="space-y-4">
                            {filteredAppointments.map((booking) => (
                                <div key={booking._id} className="border p-4 rounded-lg shadow-sm">
                                    <p className="text-blue-500"><strong>Patient:</strong> {booking.patientName}</p>
                                    <p className="text-blue-500"><strong>Doctor:</strong> {booking.doctorName}</p>
                                    <p className="text-blue-500"><strong>Reason:</strong> {booking.reason}</p>
                                    <p className="text-blue-500"><strong>Status:</strong> {booking.status}</p>

                                    <div className="flex space-x-4 mt-4">
                                        {booking.status !== 'confirmed' && (
                                            <>
                                                <button
                                                    onClick={() => handleAppointmentAction(booking._id, 'approve')}
                                                    className="p-2 w-32 rounded bg-green-500 text-white hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAppointmentAction(booking._id, 'reject')}
                                                    className="p-2 w-32 rounded bg-red-500 text-white hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => handleDeleteAppointment(booking._id)}
                                            className="p-2 w-32 rounded bg-red-500 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-blue-500">No appointments available.</p>
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">{currentDoctor ? 'Edit Doctor' : 'Add Doctor'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Hospital</label>
                                <input
                                    type="text"
                                    name="hospital"
                                    value={formData.hospital}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Average Rating</label>
                                <input
                                    type="number"
                                    name="averageRating"
                                    value={formData.averageRating}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Qualifications (comma separated)</label>
                                <input
                                    type="text"
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="p-2 w-32 rounded bg-gray-500 text-white hover:bg-gray-700 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="p-2 w-32 rounded bg-blue-500 text-white hover:bg-blue-700"
                                >
                                    {currentDoctor ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <ToastContainer />
        </section>
    );
};

export default AdminDashboard;
