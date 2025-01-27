import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Slots = () => {
    const [slots, setSlots] = useState([]);
    const [newSlot, setNewSlot] = useState({
        day: '',
        startTime: '',
        endTime: '',
    });
    const [editSlot, setEditSlot] = useState(null); // For editing an existing slot

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const availableTimes = [
        '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
    ];

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = () => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            toast.error("Doctor ID not found. Please log in again.");
            return;
        }

        fetch(`http://localhost:5000/api/v1/doctors/timeSlots/${doctorId}`)
            .then(response => response.json())
            .then(data => {
                if (!data || !data.timeSlots) {
                    console.error("Invalid API response:", data);
                    toast.error("Error fetching slots.");
                    return;
                }
                setSlots(data.timeSlots);
            })
            .catch(error => {
                console.error("Error fetching slots:", error);
                toast.error("Error fetching slots.");
            });
    };

    const handleAddSlot = () => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            toast.error("Doctor ID not found. Please log in again.");
            return;
        }

        fetch(`http://localhost:5000/api/v1/doctors/timeSlots/add/${doctorId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newSlot)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (!data || !data.timeSlots) {
                    console.error("Invalid API response:", data);
                    toast.error("Error adding slot.");
                    return;
                }
                setSlots(data.timeSlots);
                toast.success("New slot added successfully!");
                setNewSlot({ day: '', startTime: '', endTime: '' });
            })
            .catch((error) => {
                console.error("Error adding slot:", error);
                toast.error("Error adding slot.");
            });
    };

    const handleEditSlot = () => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId || !editSlot) {
            toast.error("Slot data is missing.");
            return;
        }

        console.log("Editing Slot:", editSlot);

        fetch(`http://localhost:5000/api/v1/doctors/timeSlots/${editSlot._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                day: editSlot.day,
                startTime: editSlot.startTime,
                endTime: editSlot.endTime,
                available: editSlot.available
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setSlots(slots.map(slot => slot._id === editSlot._id ? data.timeSlot : slot));
                toast.success("Slot updated successfully!");
                setEditSlot(null);
            })
            .catch((error) => {
                console.error("Error updating slot:", error);
                toast.error("Error updating slot.");
            });
    };

    const handleDeleteSlot = (slotId) => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            toast.error("Doctor ID not found. Please log in again.");
            return;
        }

        fetch(`http://localhost:5000/api/v1/doctors/timeSlots/${slotId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setSlots(slots.filter((slot) => slot._id !== slotId));
                toast.success("Slot deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting slot:", error);
                toast.error("Error deleting slot.");
            });
    };

    return (
        <div className="mb-4 p-4 bg-white rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-blue-500">Available Slots</h3>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <select
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({ ...newSlot, day: e.target.value })}
                    className="p-2 border rounded-md"
                >
                    <option value="">Select Day</option>
                    {daysOfWeek.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                </select>
                <select
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="p-2 border rounded-md"
                >
                    <option value="">Select Start Time</option>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <select
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="p-2 border rounded-md"
                >
                    <option value="">Select End Time</option>
                    {availableTimes.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
                <button
                    onClick={handleAddSlot}
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Add Slot
                </button>
            </div>
            <div className="mt-4 space-y-2">
                {slots.length > 0 ? (
                    <div className="overflow-x-auto"> {/* Adding horizontal scroll for small screens */}
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2">Day</th>
                                    <th className="py-2">Start Time</th>
                                    <th className="py-2">End Time</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot) => (
                                    <tr key={slot._id}>
                                        <td className="border px-4 py-2">{slot.day}</td>
                                        <td className="border px-4 py-2">{slot.startTime}</td>
                                        <td className="border px-4 py-2">{slot.endTime}</td>
                                        <td className="border px-4 py-2">
                                            <button onClick={() => setEditSlot(slot)} className="text-yellow-500">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteSlot(slot._id)} className="text-red-500 ml-2">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No available slots.</p>
                )}
            </div>

            {editSlot && (
                <div className="mt-4 p-4 bg-white rounded-md shadow-md">
                    <h3 className="text-xl font-semibold text-blue-500">Edit Slot</h3>
                    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                        <select
                            value={editSlot.day || ''}
                            onChange={(e) => setEditSlot({ ...editSlot, day: e.target.value })}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Select Day</option>
                            {daysOfWeek.map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select
                            value={editSlot.startTime || ''}
                            onChange={(e) => setEditSlot({ ...editSlot, startTime: e.target.value })}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Select Start Time</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <select
                            value={editSlot.endTime || ''}
                            onChange={(e) => setEditSlot({ ...editSlot, endTime: e.target.value })}
                            className="p-2 border rounded-md"
                        >
                            <option value="">Select End Time</option>
                            {availableTimes.map((time) => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                        <button
                            onClick={handleEditSlot}
                            className="bg-yellow-500 text-white p-2 rounded-md"
                        >
                            Update Slot
                        </button>
                        <button
                            onClick={() => setEditSlot(null)}
                            className="bg-gray-500 text-white p-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Slots;
