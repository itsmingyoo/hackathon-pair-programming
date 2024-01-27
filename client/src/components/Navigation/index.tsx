import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import ProfileButton from './ProfileButton';
import logo from '../../assets/devpair-logos/svg/logo-no-background.svg';
import logo2 from '../../assets/devpair-logos/svg/logo-no-background-black.svg';
import './Navigation.css';

interface NavigationProps {
    isLoaded: boolean;
}

function Navigation({ isLoaded }: NavigationProps) {
    // Assuming `state.session.user` is of type User | null
    const sessionUser = useSelector((state: RootState) => state.session.user);

    const prefersLightTheme = window.matchMedia('(prefers-color-scheme: light)');

    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
    //will change nav display from profile button to login/signup buttons depending on if user is signed in or not
    let userLoggedIn: boolean = false;
    if (sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    return (
        <div className="nav-container">
            <div className="nav-links">
                <div className="nav-links-home">
                    <NavLink to="/home">
                        <img className="logo-for-nav" src={prefersLightTheme.matches ? logo2: logo} alt="dev-pair logo" />
                    </NavLink>
                </div>
                <div className="nav-links-other">
                    {isLoaded && userLoggedIn && sessionUser ? (
                        <div className="nav-links-profile-button">
                            <ProfileButton user={sessionUser} />
                        </div>
                    ) : (
                        <div className="nav-links-login-and-signout">
                            <div>
                                <NavLink to="/login">Login</NavLink>
                            </div>
                            <div>
                                <NavLink to="/signup">Sign Up</NavLink>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navigation;
