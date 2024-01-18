import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ProfileButton from './ProfileButton';
import './Navigation.css';

interface NavigationProps {
    isLoaded: boolean;
}

function Navigation({ isLoaded }: NavigationProps) {
    // Assuming `state.session.user` is of type User | null
    const sessionUser = useSelector((state: RootState) => state.session.user);


    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    console.log(sessionUser)

    //will change nav display from profile button to login/signup buttons depending on if user is signed in or not
    let userLoggedIn: boolean = false;
    if(sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    return (
        <>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {isLoaded && userLoggedIn && sessionUser ? (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                ) : (
                    <>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                        </li>
                        <li>
                        <NavLink to='/signup'>Sign Up</NavLink>
                    </li>
                    </>
                )}
            </ul>
        </>
    );
}

export default Navigation;
