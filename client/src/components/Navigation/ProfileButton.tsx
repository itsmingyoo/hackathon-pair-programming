import React, { useState, useEffect, useRef } from 'react';
import { logout } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import OpenModalButton from '../OpenModalButton/index';
import LoginFormModal from '../LoginFormModal/index';
import SignupFormModal from '../SignupFormModal/index';
import { User } from '../../interfaces/user';
import './ProfileButton.css';

interface ProfileButtonProps {
    user: User;
}

function ProfileButton({ user }: ProfileButtonProps) {
    const dispatch = useAppDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef<HTMLUListElement>(null); // Specify the element type for the ref

    const openMenu = () => {
        console.log("Button clicked!");
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e: Event) => {
            if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [showMenu]);

    const ulClassName = `profile-dropdown${showMenu ? '' : ' hidden'}`;
    console.log("showMenu:", showMenu);
    console.log("ulClassName:", ulClassName);

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logout());
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />User
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={handleLogout}>Log Out</button>
                        </li>
                    </>
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
            </ul>
        </>
    );
}

export default ProfileButton;
