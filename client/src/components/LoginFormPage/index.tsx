import { useState, FormEvent } from 'react';
import { login } from '../../store/session';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
// import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);


    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
    let userLoggedIn: boolean = false;
    if(sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    if (userLoggedIn) return <Navigate to="/" replace />;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = await dispatch(login({ email, password }));
        if (data && Array.isArray(data)) {
            setErrors(data);
        }
    };

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Log In</button>
            </form>
        </>
    );
}

export default LoginFormPage;
