import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar.png';
import { BiMenu } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to track menu toggle
    const { isAuthenticated, logout } = useAuth();
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Toggle menu state
        menuRef.current.classList.toggle('show__menu');
    };

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    return (
        <header
            className="header flex items-center"
            ref={headerRef}
            style={{
                backgroundColor: '#1e3a8a',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                top: '0',
                zIndex: '100',
            }}
        >
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                height: '80px',
                                objectFit: 'contain',
                            }}
                        />
                    </div>
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex items-center gap-[2.7rem]">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className={`${isScrolled ? 'nav__link-scrolled' : 'nav__link-initial'} text-[16px] leading-7 font-[500] hover:text-primaryColor ${isMenuOpen ? 'text-black' : ''}`}  // Conditionally change text color
                                    >
                                        {link.display}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden">
                            <Link to="/">
                                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                                    <img
                                        src={userImg}
                                        className="w-full rounded-full"
                                        alt="User Avatar"
                                    />
                                </figure>
                            </Link>
                        </div>
                        {!isAuthenticated ? (
                            <Link to="/login">
                                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                                    Login
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]"
                            >
                                Logout
                            </button>
                        )}
                        <span className="md:hidden" onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;