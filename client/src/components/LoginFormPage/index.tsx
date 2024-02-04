import { useState, FormEvent } from 'react';
import { login } from '../../store/session';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import './LoginForm.css';
import Footer from '../Footer';

function LoginFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
    let userLoggedIn: boolean = false;
    if (sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    if (userLoggedIn) return <Navigate to="/" replace />;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('Login Pressed');
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (regex.test(email) === false) {
            setErrors(['Invalid']);
        }
        if (password.length < 8) {
            setErrors(['Invalid']);
        }
        // console.log('errors ', errors);
        if (errors.length === 0) {
            const actionResult = await dispatch(login({ email, password }));
            if (login.fulfilled.match(actionResult)) {
                // Handle the fulfilled case
                // console.log('Login successful:', actionResult.payload);
                navigate(`/users/${actionResult.payload!.id}`);
            } else if (login.rejected.match(actionResult)) {
                // Handle the rejected case
                const error =
                    typeof actionResult.payload === 'string' ? actionResult.payload : 'An unexpected error occurred';
                setErrors([error]);
                // console.log('Login failed:', error);
            }
        }
    };

    const handleDemoSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const data = await dispatch(login({ email: 'demo@aa.io', password: 'password' }));
        if (data && Array.isArray(data)) {
            setErrors(data);
        } else if (login.fulfilled.match(data)) {
            navigate(`/users/${data.payload!.id}`);
        } else {
            alert('Login failed');
        }
    };

    const errorClass = errors.length > 0 ? 'login-form-error login-form-input' : 'login-form-input';

    const errorDisplay =
        errors.length > 0 ? <div className="login-error-text">Email and password are invalid</div> : <></>;

    return (
        <>
            <main className="login-component">
                <div className="login-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Log In</h1>
                        <label className="form-labels">
                            <div className="login-page-input-text">Email address</div>
                            <input
                                className={errorClass}
                                placeholder="Email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className="form-labels">
                            <div className="login-page-input-text">Password</div>
                            <input
                                className={errorClass}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        {errorDisplay}
                        <button className="login-form-button" type="submit">
                            Log In
                        </button>
                        <button className="login-demo-user" onClick={handleDemoSubmit}>
                            Signin as Demo User
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default LoginFormPage;
