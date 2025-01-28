import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import { BiSearch } from 'react-icons/bi'; // Import the search icon

const Doctors = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('https://yoclinic.onrender.com/api/v1/doctors', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setDoctors(data.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleBookAppointment = () => {
        const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in localStorage

        if (isLoggedIn) {
            navigate('/appointment'); // Redirect to appointment booking page if logged in
        } else {
            navigate('/login'); // Redirect to login if not logged in
        }
    };

    const filteredDoctors = doctors.filter(doctor =>
        (doctor.name && doctor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doctor.specialization && doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (doctor.hospital && doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            {/* Search Section */}
            <section className='bg-[#fff9ea]'>
                <div className="container text-center">
                    <h2 className="heading text-primaryColor"> {/* Make "Find A Doctor" text solid blue */}
                        Find A Doctor
                    </h2>
                    <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center'>
                        <label className='flex items-center w-full px-4'>
                            <BiSearch className="text-primaryColor w-5 h-5 mr-2" /> {/* Search icon */}
                            <input
                                type="search"
                                placeholder='Find a Doctor'
                                className='py-4 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </label>
                    </div>
                </div>
            </section>

            {/* Doctors Section */}
            <section>
                <div className="container">
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {filteredDoctors.map(doctor => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Book Appointment Section */}
            <section className='py-16'>
                <div className="container text-center">
                    <button className='btn' onClick={handleBookAppointment}>
                        Book An Appointment
                    </button>
                </div>
            </section>

            {/* Testimonials Section */}
            <section>
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>What Our Patients Say</h2>
                        <p className='text__para text-center'>World-Class Care For Everyone. Our Health System Offers Unmatched, Expert Health Care.</p>
                    </div>

                    <Testimonial />
                </div>
            </section>
        </>
    );
};

export default Doctors;
