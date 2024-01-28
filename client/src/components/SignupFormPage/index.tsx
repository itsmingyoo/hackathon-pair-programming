import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import './SignupForm.css';

type ErrorState = {
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
  };

function SignupFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user);
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<ErrorState>({email: null, password: null, confirmPassword: null});

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

        const newErrors: ErrorState = { email: null, password: null, confirmPassword: null };

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
        if (password === confirmPassword && !errors.email && !errors.password && !errors.confirmPassword) {
            const data = await dispatch(signUp({ username, email, password }));
            if (data && Array.isArray(data)) {
                setErrors(data);
            }
        }
    };

    //possible to make erros an object istead of array?
    const emailClass = errors.email ? "signup-form-errors signup-form-input" : "signup-form-input";
    const passwordClass = errors.password ? "signup-form-errors signup-form-input" : "signup-form-input";
    const confirmPasswordClass = errors.confirmPassword ? "signup-form-errors signup-form-input" : "signup-form-input"

    const emailErrorDisplay = errors.email ? <div className='signup-error-text'>Please enter a valid email</div> : <></>
    const passwordErrorDisplay = errors.password ? <div className='signup-error-text'>Password must be at least 8 characters</div> : <></>
    const confirmPasswordErrorDisplay = errors.confirmPassword ? <div className='signup-error-text'>Passwords must match</div> : <></>

    return (
      <div className="signup-component">
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
