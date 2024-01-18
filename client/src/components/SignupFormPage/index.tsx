import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
// import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user); // Type the state
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]); // Assuming errors are an array of strings


    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
    let userLoggedIn: boolean = false;
    if(sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    if (userLoggedIn) return <Navigate to="/" replace />; // user cannot go back with the back button after signing up

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(signUp({ username, email, password }));
            if (data && Array.isArray(data)) {
                setErrors(data);
            }
        } else {
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
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
                    Username
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormPage;
