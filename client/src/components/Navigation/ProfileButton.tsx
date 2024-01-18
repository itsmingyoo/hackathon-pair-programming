import React, { useState, useEffect, useRef } from 'react';
import { logout } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { User } from '../../interfaces/user';

interface ProfileButtonProps {
    user: User;
}

function ProfileButton({ user }: ProfileButtonProps) {
    const dispatch = useAppDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef<HTMLUListElement>(null); // Specify the element type for the ref

    const openMenu = () => {
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

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(logout());
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-user-circle" />
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
