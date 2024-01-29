import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import OpenModalButton from '../OpenModalButton/index';
import LoginFormModal from '../LoginFormModal/index';
import SignupFormModal from '../SignupFormModal/index';
import { User } from '../../interfaces/user';
import optionsIcon from '../../assets/devpair-logos/svg/options-icon.svg';
import './ProfileButton.css';

function ProfileButton({ user }: { user: User }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef<HTMLDivElement>(null); // Specify the element type for the ref

    useEffect(() => {
        if (showMenu === false) return;

        const closeMenuOnClickOutside = (e: MouseEvent) => {
            // add a null check since we're getting an error here with our new modified code to implement signup - login modal buttons separate from the profile button
            if (!ulRef.current || !ulRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenuOnClickOutside);

        return () => document.removeEventListener('click', closeMenuOnClickOutside);
    }, [showMenu]);

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(logout());
        navigate('/', { replace: true });
    };

    const ulClassName = showMenu ? 'dropdown-container' : ' hidden';
    const closeMenu = () => setShowMenu(false);
    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Prevent click event from bubbling up to the document
        setShowMenu(!showMenu); // toggle menu
    };

    return (
        <>
            <div className="profile-dropdown">
                <button onClick={(e) => openMenu(e)} id="options-button">
                    <img src={optionsIcon} alt="options-icon" id="options-icon" />
                </button>
                <div className={ulClassName} ref={ulRef}>
                    <div className="dropdown-list">
                        {user ? (
                            <div className='user-profile-dropdown-info'>
                                {/* <div className='profile-dropdown-welcome'>Welcome, {user.username}!</div> */}
                                <button className='profile-setings-button'>Profile Settings</button>
                                <div>
                                    <button className='logout-button' onClick={handleLogout}>Log Out</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <OpenModalButton
                                    buttonText="Log In"
                                    onItemClick={closeMenu}
                                    modalComponent={<LoginFormModal />}
                                />

                                <OpenModalButton
                                    buttonText="Sign Up"
                                    onItemClick={closeMenu}
                                    modalComponent={<SignupFormModal />}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileButton;
