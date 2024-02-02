import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ProfileButton from './ProfileButton';
import name from '../../assets/devpair-logos/svg/devpair-high-resolution-logo-transparent.svg';
import './Navigation.css';

interface NavigationProps {
    isLoaded: boolean;
}

function Navigation({ isLoaded }: NavigationProps) {
    // Assuming `state.session.user` is of type User | null
    const sessionUser = useSelector((state: RootState) => state.session.user);

    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
    //will change nav display from profile button to login/signup buttons depending on if user is signed in or not
    let userLoggedIn: boolean = false;
    if (sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    return (
        <header className="nav-container">
            <div className="nav-links">
                <div className="nav-links-home">
                    <NavLink to="/" className="nav-links-home">
                        <img className="logo" src={name} alt="devpair logo and link to home" />
                    </NavLink>
                </div>
                <nav className="nav-links-other">
                    {isLoaded && userLoggedIn && sessionUser ? (
                        <ProfileButton />
                    ) : (
                        <div className="nav-links-login-and-signout">
                            <div>
                                <NavLink to="/login">Login</NavLink>
                            </div>
                            <div>
                                <NavLink to="/signup">Register</NavLink>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navigation;
