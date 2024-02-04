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
  username: string | null;
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
      username: null,
      password: null,
      confirmPassword: null,
    });
    const navigate = useNavigate();

    // console.log("errors", errors);

    useEffect(() => {
      if (sessionUser && !sessionUser.errors) {
        navigate("/");
      }
    }, [sessionUser, navigate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      //tests if email is valid

      const newErrors: ErrorState = {
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
      };

      if (regex.test(email) === false) {
        newErrors.email = "Please enter a valid email";
      } else {
        newErrors.email = null;
      }

      if (password.length < 8) {
        newErrors.password = "Password should be at least 8 characters";
      } else {
        newErrors.password = null;
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword =
          "Confirm Password field must be the same as the Password field";
      } else {
        newErrors.confirmPassword = null;
      }

      setErrors(newErrors);

      // if no errors, dispatch thunk
      if (
        newErrors.email == null &&
        newErrors.password == null &&
        newErrors.confirmPassword == null
      ) {
        const actionResult = await dispatch(
          signUp({ username, email, password })
        );
        // console.log("this is actionresult", actionResult);
        if ((actionResult.payload as any).errors) {
          setErrors({
            email: null,
            username: "This username is already taken",
            password: null,
            confirmPassword: null,
          });
        } else {
          // Now that we know payload is not null/undefined, check if it's not a string
          if (typeof actionResult.payload !== "string") {
            // console.log("this is actionresult.payload.id");
            // Since payload is not a string, null, or undefined, we can assume it's a User object
            // However, as a good practice, still perform a safety check for the property
            if ("id" in actionResult.payload!) {
              // console.log("we should be navigating");
              navigate(`/users/${actionResult.payload.id}`);
            }
          }
        }
      }
    };

    //possible to make erros an object istead of array?
    const emailClass = errors.email ? 'signup-form-errors signup-form-input' : 'signup-form-input';
    const usernameClass = errors.username
      ? "signup-form-errors signup-form-input"
      : "signup-form-input";
    const passwordClass = errors.password ? 'signup-form-errors signup-form-input' : 'signup-form-input';
    const confirmPasswordClass = errors.confirmPassword ? 'signup-form-errors signup-form-input' : 'signup-form-input';

    const emailErrorDisplay = errors.email ? (
        <div className="signup-error-text">Please enter a valid email</div>
    ) : (
        <></>
    );
    const usernameErrorDisplay = errors.username ? (
      <div className="signup-error-text">This username is already taken</div>
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
                  className={usernameClass}
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                {usernameErrorDisplay}
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
                  to={"/login"}
                  className="signup-form-button-click-here"
                  style={{ margin: "0" }}
                >
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
