import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

function DoctorCard({ doctor }) {
    const {
        name,
        specialization,
        avgRating,
        totalRating,
        totalPatients,
        hospital,
        photo,
        qualifications,
        experiences,
        bio,
        isAvailable,
    } = doctor;

    return (
        <div className="p-3 lg:p-5 border-2 rounded-lg hover:shadow-lg transition transform hover:scale-105">
            <div className="flex justify-center mb-4">
                {photo ? (
                    <img
                        src={`http://localhost:5000/${photo}`}
                        alt={name}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-white">No Image</span>
                    </div>
                )}
            </div>

            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
                Dr. {name}
            </h2>

            <p className="truncate text-blue-500">{specialization}</p>

            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <div className="flex items-center gap-[6px]">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((star, i) => (
                            <i
                                key={i}
                                className={`fas fa-star ${i < avgRating ? 'text-yellow-500' : 'text-gray-300'}`}
                            ></i>
                        ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({totalRating} reviews)</span>
                </div>
            </div>

            <div className="mt-[18px] lg:mt-5">
                <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
                    + {totalPatients} Patients
                </h3>
                <p className="text-[14px] leading-6 font-[400] text-textColor">
                    At {hospital}
                </p>
            </div>

            {qualifications && (
                <div className="mt-4">
                    <h4 className="font-semibold text-headingColor">Qualifications:</h4>
                    <ul className="list-disc list-inside text-textColor">
                        {qualifications.map((qualification, index) => (
                            <li key={index}>{qualification}</li>
                        ))}
                    </ul>
                </div>
            )}

            {experiences && (
                <div className="mt-4">
                    <h4 className="font-semibold text-headingColor">Experiences:</h4>
                    <ul className="list-disc list-inside text-textColor">
                        {experiences.map((experience, index) => (
                            <li key={index}>{experience}</li>
                        ))}
                    </ul>
                </div>
            )}

            {bio && (
                <div className="mt-4">
                    <h4 className="font-semibold text-headingColor">Bio:</h4>
                    <p className="text-textColor">{bio}</p>
                </div>
            )}

            <div className="mt-4">
                <h4 className="font-semibold text-headingColor">Availability:</h4>
                <p className={`text-${isAvailable ? 'green' : 'red'}-500`}>
                    {isAvailable ? 'Available' : 'Not Available'}
                </p>
            </div>

            <div className="mt-4 flex justify-end">
                <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center group hover:bg-primaryColor hover:border-none justify-center"
                >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
            </div>
        </div>
    );
}

DoctorCard.propTypes = {
    doctor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        specialization: PropTypes.string.isRequired,
        avgRating: PropTypes.number.isRequired,
        totalRating: PropTypes.number.isRequired,
        totalPatients: PropTypes.number.isRequired,
        hospital: PropTypes.string.isRequired,
        photo: PropTypes.string, // Optional
        qualifications: PropTypes.arrayOf(PropTypes.string), // Optional
        experiences: PropTypes.arrayOf(PropTypes.string), // Optional
        bio: PropTypes.string, // Optional
        isAvailable: PropTypes.bool.isRequired, // Required
    }).isRequired,
};

export default DoctorCard;
