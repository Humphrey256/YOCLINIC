import { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch doctors from the API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://yoclinic.onrender.com/api/v1/doctors', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch doctors');
                }

                const data = await response.json();

                // Remove duplicate doctors based on 'name'
                const uniqueDoctors = Array.from(new Map(data.data.map(doctor => [doctor.name, doctor])).values());

                setDoctors(uniqueDoctors);
            } catch (error) {
                setError('Error fetching doctors');
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false); // Set loading to false after request is complete
            }
        };

        fetchDoctors();
    }, []); // Empty dependency array to run only once when the component mounts

    // Show loading message while fetching data
    if (loading) {
        return <div>Loading doctors...</div>;
    }

    // Show error message if there was an error fetching the data
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {doctors.length > 0 ? (
                doctors.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} /> // Pass doctor data to DoctorCard
                ))
            ) : (
                <div>No doctors available</div> // Display message when no doctors are found
            )}
        </div>
    );
}

export default DoctorList;
