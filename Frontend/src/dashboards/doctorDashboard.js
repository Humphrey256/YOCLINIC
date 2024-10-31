// DoctorsDashboard.js
import React, { useEffect, useState } from 'react';

const DoctorsDashboard = ({ doctorName }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch appointments for the specific doctor from the backend
        fetch(`/api/appointments?doctor=${doctorName}`)
            .then((response) => response.json())
            .then((data) => {
                setAppointments(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching appointments:", error);
                setLoading(false);
            });
    }, [doctorName]);

    const handleApprove = (appointmentId) => {
        // Call backend to approve the appointment and notify the patient
        fetch(`/api/appointments/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Appointment approved and patient notified!");
                // Optionally, refresh the appointments list
                setAppointments(appointments.filter(app => app.id !== appointmentId));
            }
        })
        .catch(error => console.error("Error approving appointment:", error));
    };

    const handleReject = (appointmentId) => {
        // Call backend to reject the appointment and notify the patient
        fetch(`/api/appointments/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Appointment rejected and patient notified!");
                // Optionally, refresh the appointments list
                setAppointments(appointments.filter(app => app.id !== appointmentId));
            }
        })
        .catch(error => console.error("Error rejecting appointment:", error));
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Doctor's Dashboard</h2>
            <p className="text-lg font-semibold mt-2">Dr. {doctorName}</p>

            {loading ? (
                <p>Loading appointments...</p>
            ) : appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-gray-200 p-4 mt-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="text-black font-semibold">Patient Name: {appointment.patientName}</p>
                            <p className="text-black font-semibold">Date: {appointment.date}</p>
                            <p className="text-black font-semibold">Time: {appointment.time}</p>
                            <p className="text-black font-semibold">Reason: {appointment.reason}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button onClick={() => handleApprove(appointment.id)} className="bg-blue-600 text-white px-4 py-2 rounded">Approve</button>
                            <button onClick={() => handleReject(appointment.id)} className="bg-blue-600 text-white px-4 py-2 rounded">Reject</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No appointments available</p>
            )}
        </div>
    );
};

export default DoctorsDashboard;
