//import React from 'react'; // Uncomment this if not already imported
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules'; // For recent versions of Swiper
import { HiStar } from 'react-icons/hi'; // Import HiStar from react-icons

function Testimonial() {
    return (
        <div className='mt-[30px] lg:mt-[55px]'>
            <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
            >
                <SwiperSlide>
                    <div className='py-[30px] px-5 rounded-3'>
                        <div className='flex items-center gap-[13px]'>
                            {/* Replace with an actual imported image or path */}
                            <img src={'/path/to/patient-avatar.png'} alt="Patient Avatar" />
                            <div>
                                <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                                    Mohamed Boukthir
                                </h4>
                                <div className='flex items-center gap-[2px]'>
                                    {/* Use HiStar icon */}
                                    <HiStar className='text-yellowColor w-[18px] h-5' />
                                    {/* Add additional HiStar components as needed */}
                                </div>
                            </div>
                        </div>
                        <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                            I have taken Medical services from them, they treat so well, and they are providing the best medical services.
                        </p>
                    </div>
                </SwiperSlide>
                {/* Repeat SwiperSlide components as needed */}
            </Swiper>
        </div>
    );
}

export default Testimonial;
