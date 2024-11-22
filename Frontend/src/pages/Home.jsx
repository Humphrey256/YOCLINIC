//import React from 'react'

import icon01 from '../assets/images/logo.webp'
import icon02 from '../assets/images/imageicon2.jpg'
import icon03 from '../assets/images/imageicon1.jpg'

import featureImg from '../assets/images/image1.jpg'
//import videoIcon from '../assets/images/logo.png'

import { Link, useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import About from '../components/About/About'

import ServiceList from '../components/Services/ServiceList'
import DoctorList from '../components/Doctors/DoctorList'
import FaqList from '../components/Faq/FaqList'
import Testimonial from '../components/Testimonial/Testimonial'


const Home = () => {
    const navigate = useNavigate();

    const handleAppointmentClick = () => {
        const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists in localStorage

        if (isLoggedIn) {
            navigate('/patientdashboard'); // Redirect to patient's dashboard if logged in
        } else {
            navigate('/login'); // Redirect to login if not logged in
        }
    };

    return (
        <>
            {/* Hero section */}
            <section className='hero__section pt-[60px] 2xl:h-[800px]'>
                <div className="container">
                    <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>
                        <div>
                            <div className='lg:w-[570px]'>
                                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                                    Your body is your most enduring home. Care for it well.
                                </h1>
                                <p className='text-white'>
                                    &quot;Your trusted partner in health, committed to delivering compassionate and personalized care that puts patients first. We believe in a holistic approach to wellness, combining advanced medical expertise with a deep commitment to empathy, respect, and understanding. Whether it&rsquo;s preventive care, diagnosis, or treatment, we are here to support you on every step of your health journey, ensuring you feel heard, valued, and well cared for. Our team of experienced professionals is dedicated to building long-term relationships with our patients, fostering trust, comfort, and confidence in the care you receive. Your well-being is our priority.&quot;
                                </p>
                                <button className='btn' onClick={handleAppointmentClick}>
                                    Make An Appointment
                                </button>
                            </div>

                            {/* Other content */}
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Work section */}

            <section>
                <div className="container">
                    <div className='lg:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>Providing The Best Medical Services</h2>
                        <p className='text__para text-center'>Our health System Offers Unmatched,
                            Expert Health Care.</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] 
          mt-[30px] lg:mt-[55px]'>

                        <div className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>
                                <img src={icon01} alt="" className="h-[100px] rounded-full" />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Find A Doctor
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                                    Our Health System Offers
                                    Unmatched, Expert Health Care. From The Lab To The Clinic.
                                </p>

                                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center group
                   hover:bg-primaryColor hover:border-none justify-center'>
                                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                                </Link>
                            </div>
                        </div>

                        <div className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>
                                <img src={icon02} alt="" className="h-[100px] rounded-full" />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Find A Location
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                                    Our Health System Offers
                                    Unmatched, Expert Health Care. From The Lab To The Clinic.
                                </p>

                                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center group
                   hover:bg-primaryColor hover:border-none justify-center'>
                                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                                </Link>
                            </div>
                        </div>

                        <div className='py-[30px] px-5'>
                            <div className='flex items-center justify-center'>
                                <img src={icon03} alt="" className="h-[100px] rounded-full" />
                            </div>

                            <div className='mt-[30px]'>
                                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                                    Book Appointment
                                </h2>
                                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                                    World-Class Care For Everyone. Our Health System Offers
                                    Unmatched, Expert Health Care. From The Lab To The Clinic.
                                </p>

                                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center group
                   hover:bg-primaryColor hover:border-none justify-center'>
                                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* About section */}

            <About />

            {/* Services section */}

            <section>
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center'>Our Medical Services</h2>
                        <p className='text__para text-center'>Our Health System Offers Unmatched,
                            Expert Health Care.</p>
                    </div>

                    <ServiceList />
                </div>
            </section>

            {/* Feature section */}

            <section>
                <div className="container">
                    <div className="flex items-center justify-between flex-col lg:flex-row">

                        <div className='xl:w-[670px]'>
                            <h2 className="heading">
                                Get Virtual Treatment <br /> Anytime.
                            </h2>

                            <ul className="pl-4">
                                <li className="text__para">
                                    1. Schedule The Appointment Directly.
                                </li>
                                <li className="text__para">
                                    2. Search for Your Physician Here and Contact Their Office.
                                </li>
                                <li className="text__para">
                                    3. View Our Physicians Accepting New Patients,
                                    Select an Appointment Time.
                                </li>
                            </ul>
                            <Link to='/'>
                                <button className="btn">Learn More</button>
                            </Link>
                        </div>

                        <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
                            <img src={featureImg} alt="" />
                            <div className='absolute top-[40%] left-[30%]'>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Doctor section */}

            <section className="bg-slate-300 py-[80px]">
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center text-primaryColor'>Our Skilled Doctors</h2>
                        <p className='text__para text-center'>
                            Our Health System Offers Unmatched, Expert Health Care.
                        </p>
                    </div>

                    <DoctorList />
                </div>
            </section>

            {/* FAQ section */}

            <section className="py-[80px]">
                <div className="container">
                    <div className='xl:w-[470px] mx-auto'>
                        <h2 className='heading text-center text-primaryColor'>Frequently Asked Questions</h2>
                    </div>

                    <FaqList />
                </div>
            </section>

            {/* Testimonial section */}

            <Testimonial />
        </>
    )
}

export default Home
