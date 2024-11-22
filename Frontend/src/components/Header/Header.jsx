import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar.png';
import { BiMenu } from 'react-icons/bi';

const navLinks = [
    { path: '/home', display: 'Home' },
    { path: '/doctors', display: 'Find a Doctor' },
    { path: '/services', display: 'Services' },
    { path: '/contact', display: 'Contact' },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
    const navigate = useNavigate();

    const handleStickyHeader = () => {
        if (window.scrollY > 80) {
            headerRef.current.classList.add('sticky__header');
            setIsScrolled(true);
        } else {
            headerRef.current.classList.remove('sticky__header');
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleStickyHeader);
        return () => window.removeEventListener('scroll', handleStickyHeader);
    }, []);

    const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

    // Simulate checking if the user is logged in (e.g., from a token or session)
    useEffect(() => {
        const user = localStorage.getItem('user'); // You can replace this with your actual logic
        if (user) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        setIsAuthenticated(false); // Update login state
        navigate('/home'); // Redirect to home page
    };

    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <img src={logo} alt="" className="logo" />
                    </div>
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={`${isScrolled ? 'nav__link-scrolled' : 'nav__link-initial'} text-[16px] leading-7 font-[500] hover:text-primaryColor`}
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='hidden'>
                            <Link to='/'>
                                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                                    <img src={userImg} className='w-full rounded-full' alt="" />
                                </figure>
                            </Link>
                        </div>
                        {!isAuthenticated ? (
                            <Link to='/login'>
                                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                                    Login
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'
                            >
                                Logout
                            </button>
                        )}
                        <span className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className='w-6 h-6 cursor-pointer' />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
