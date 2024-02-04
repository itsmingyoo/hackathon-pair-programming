import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import optionsIcon from '../../assets/devpair-logos/svg/options-icon.svg';
import { useAppSelector } from '../../hooks';
import './ProfileButton.css';

function ProfileButton() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef<HTMLUListElement>(null);
    const sessionUserId = useAppSelector((state) => state.session?.user?.id);

    useEffect(() => {
        const closeMenuOnClickOutside = (e: MouseEvent) => {
            if (!ulRef.current || !ulRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenuOnClickOutside);

        return () => document.removeEventListener('click', closeMenuOnClickOutside);
    }, []);

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await dispatch(logout());
        navigate('/', { replace: true });
    };

    const handleProfileButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (sessionUserId) navigate(`/users/${+sessionUserId}`);
    };

    const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    return (
        <div className="profile-dropdown">
            <button onClick={(e) => openMenu(e)} id="options-button">
                <img src={optionsIcon} alt="options-icon" id="options-icon" />
            </button>
            {showMenu && (
                <ul className="dropdown-list dropdown-container" ref={ulRef}>
                    <li className="user-profile-dropdown-info">
                        <button className="profile-setings-button" onClick={handleProfileButton}>
                            DashBoard
                        </button>
                    </li>
                    <li>
                        <button className="logout-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
