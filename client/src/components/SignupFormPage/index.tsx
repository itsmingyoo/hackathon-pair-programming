import { useState, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signUp } from '../../store/session';
import { useAppDispatch } from '../../hooks';
import { RootState } from '../../store';
import "./SignupForm.css";

function SignupFormPage() {
    const dispatch = useAppDispatch();
    const sessionUser = useSelector((state: RootState) => state.session.user); // Type the state
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]); // Assuming errors are an array of strings

    console.log("errors", errors);

    //sessionUser is returning true even if there is no user logged in because it is returning the user object { errors: [] }
    //so we need to check if there is a user object and if there are no errors in the user object
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
        setErrors(["Please enter a valid email"]);
      } else if (password.length < 8) {
        setErrors(["Password should be at least 8 characters"]);
      } else if (password !== confirmPassword) {
        setErrors([
          "Confirm Password field must be the same as the Password field",
        ]);
        if (password === confirmPassword) {
          const data = await dispatch(signUp({ username, email, password }));
          if (data && Array.isArray(data)) {
            setErrors(data);
          }
        } else {
          setErrors([
            "Confirm Password field must be the same as the Password field",
          ]);
        }
      }
    };

    //possible to make erros an object istead of array?
    // const emailErrorsClass = errors.email ? "email-login-errors" : "";
    // const firstNameErrorsClass = errors.firstname ? "email-login-errors" : "";
    // const lastNameErrorsClass = errors.lastname ? "email-login-errors" : "";
    // const userNameErrorsClass = errors.username ? "email-login-errors" : "";
    // const passwordErrorsClass = errors.password ? "email-login-errors" : "";

    return (
      <div className="signup-component">
        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <ul>
              {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            </ul>
            <label>
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
              <input
                className="signup-form-input"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button className="signup-form-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
}

export default SignupFormPage;
