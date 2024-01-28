import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import './SignupForm.css';

function SignupFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    console.log('errors', errors);

    let userLoggedIn: boolean = false;
    if (sessionUser && !sessionUser.errors) {
        userLoggedIn = true;
    }

    if (userLoggedIn) return <Navigate to="/" replace />; // user cannot go back with the back button after signing up

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regex =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        //tests if email is valid
        if (regex.test(email) === false) {
            setErrors(['Please enter a valid email']);
        } else if (password.length < 8) {
            setErrors(['Password should be at least 8 characters']);
        } else if (password !== confirmPassword) {
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
        if (password === confirmPassword) {
            const data = await dispatch(signUp({ username, email, password }));
            if (data && Array.isArray(data)) {
                setErrors(data);
            }
        }
    };

    //possible to make erros an object istead of array?
    // const emailErrorsClass = errors.email ? "email-signup-errors" : "";
    // const firstNameErrorsClass = errors.firstname ? "email-signup-errors" : "";
    // const lastNameErrorsClass = errors.lastname ? "email-signup-errors" : "";
    // const userNameErrorsClass = errors.username ? "email-signup-errors" : "";
    // const passwordErrorsClass = errors.password ? "email-signup-errors" : "";

    return (
      <div className="signup-component">
        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label>
              <div className="signup-page-input-text">Email address</div>
              <input
                className="signup-form-input"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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
                className="signup-form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <div className="signup-page-input-text">Confirm password</div>
              <input
                className="signup-form-input"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button
              className="signup-form-button"
              type="submit"
              style={{ marginBottom: "0" }}
            >
              Sign Up
            </button>
            <div className="already-have-acct">
              Already Have an account?
              <Link
                to={'/login'}
                className="signup-form-button-click-here"
                style={{ margin: "0" }}

              >
                Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignupFormPage;
