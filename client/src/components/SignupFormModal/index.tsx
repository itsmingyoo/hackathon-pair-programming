import { useState, FormEvent } from 'react';
import { useModal } from '../../context/Modal/Modal';
import { signUp } from '../../store/session';
import { useAppDispatch } from '../../hooks';
// import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = await dispatch(signUp({ username, email, password }));
            if (data && Array.isArray(data)) {
                setErrors(data);
            } else {
                closeModal();
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

export default SignupFormModal;
