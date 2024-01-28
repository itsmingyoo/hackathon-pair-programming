import { useState, FormEvent } from 'react';
import { login } from '../../store/session';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    console.log('errors ', errors);

    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
    let userLoggedIn: boolean = false;
    if (sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    if (userLoggedIn) return <Navigate to="/" replace />;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const actionResult = await dispatch(login({ email, password }));

        if (login.fulfilled.match(actionResult)) {
            // Handle the fulfilled case
            console.log('Login successful:', actionResult.payload);
        } else if (login.rejected.match(actionResult)) {
            // Handle the rejected case
            const error =
                typeof actionResult.payload === 'string' ? actionResult.payload : 'An unexpected error occurred';
            setErrors([error]);
            console.log('Login failed:', error);
        }
    };

    const handleDemoSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const data = await dispatch(login({ email: 'demo@aa.io', password: 'password' }));
        if (data && Array.isArray(data)) {
            setErrors(data);
        } else {
            return <Navigate to="/home" replace />;
        }
    };

    return (
        <div className="login-component">
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <label className="form-labels">
                        <div className="login-page-input-text">Email address</div>
                        <input
                            className="login-form-input"
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
                            className="login-form-input"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button className="login-form-button" type="submit">
                        Log In
                    </button>
                    <button className="login-demo-user" onClick={handleDemoSubmit}>
                        Signin as Demo User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginFormPage;
