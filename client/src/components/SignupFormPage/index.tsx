import React, { useState, FormEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import './SignupForm.css';
import Footer from '../Footer';

type ErrorState = {
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
};

const SignupFormPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<ErrorState>({
        email: null,
        password: null,
        confirmPassword: null,
    });
    const navigate = useNavigate();

    console.log('errors', errors);

    useEffect(() => {
        if (sessionUser && !sessionUser.errors) {
            navigate('/');
        }
    }, [sessionUser, navigate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //tests if email is valid

        const newErrors: ErrorState = {
            email: null,
            password: null,
            confirmPassword: null,
        };

        if (regex.test(email) === false) {
            newErrors.email = 'Please enter a valid email';
        }

        if (password.length < 8) {
            newErrors.password = 'Password should be at least 8 characters';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password field must be the same as the Password field';
        }

        setErrors(newErrors);

        // if no errors, dispatch thunk
        if (errors.email == null && errors.password == null && errors.confirmPassword == null) {
            const actionResult = await dispatch(signUp({ username, email, password }));
            console.log('this is actionresult', actionResult);
            if (actionResult.payload) {
                // Now that we know payload is not null/undefined, check if it's not a string
                if (typeof actionResult.payload !== 'string') {
                    // Since payload is not a string, null, or undefined, we can assume it's a User object
                    // However, as a good practice, still perform a safety check for the property
                    if ('id' in actionResult.payload) {
                        navigate(`/users/${actionResult.payload.id}`);
                    }
                }
            }
        }
    };

    //possible to make erros an object istead of array?
    const emailClass = errors.email ? 'signup-form-errors signup-form-input' : 'signup-form-input';
    const passwordClass = errors.password ? 'signup-form-errors signup-form-input' : 'signup-form-input';
    const confirmPasswordClass = errors.confirmPassword ? 'signup-form-errors signup-form-input' : 'signup-form-input';

    const emailErrorDisplay = errors.email ? (
        <div className="signup-error-text">Please enter a valid email</div>
    ) : (
        <></>
    );
    const passwordErrorDisplay = errors.password ? (
        <div className="signup-error-text">Password must be at least 8 characters</div>
    ) : (
        <></>
    );
    const confirmPasswordErrorDisplay = errors.confirmPassword ? (
        <div className="signup-error-text">Passwords must match</div>
    ) : (
        <></>
    );

    return (
        <>
            <main className="signup-component">
                <div className="signup-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>
                        <label>
                            <div className="signup-page-input-text">Email address</div>
                            <input
                                className={emailClass}
                                placeholder="Email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            {emailErrorDisplay}
                        </label>
                        <label>
                            <div className="signup-page-input-text">Username</div>
                            <input
                                className="signup-form-input"
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <div className="signup-page-input-text">Password</div>
                            <input
                                className={passwordClass}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {passwordErrorDisplay}
                        </label>
                        <label>
                            <div className="signup-page-input-text">Confirm password</div>
                            <input
                                className={confirmPasswordClass}
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {confirmPasswordErrorDisplay}
                        </label>
                        <button className="signup-form-button" type="submit" style={{ marginBottom: '0' }}>
                            Sign Up
                        </button>
                        <div className="already-have-acct">
                            Already Have an account?
                            <Link to={'/login'} className="signup-form-button-click-here" style={{ margin: '0' }}>
                                Login Here
                            </Link>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SignupFormPage;
