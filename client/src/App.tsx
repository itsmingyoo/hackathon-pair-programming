import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import { authenticate } from './store/session';
import { useAppDispatch, useAppSelector } from './hooks';
import LandingPage from './components/LandingPage';
import VideoCall from './components/VideoCalling';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const currentUser = useAppSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(authenticate())
            .then((result) => {
                if (authenticate.fulfilled.match(result)) {
                    setIsLoaded(true);
                } else {
                    console.log('Authentication result doesnt match', result);
                }
            })
            .catch((error: Error) => {
                console.error({ Error: error, Message: 'Error authenticating!' });
            });
    }, [dispatch]);

    const loggedIn = currentUser?.errors ? false : true;

    // https://reactrouter.com/en/main/route/route - this is v6 of browserrouter
    return (
        <>
            {isLoaded && (
                <Router>
                    <Navigation isLoaded={isLoaded} />
                    <Routes>
                        <Route path="" element={<LandingPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={<LoginFormPage />} />
                        <Route path="/signup" element={<SignupFormPage />} />
                        <Route
                            path="/code-collab"
                            element={
                                <ProtectedRoute loggedIn={loggedIn}>
                                    <VideoCall />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </Router>
            )}
        </>
    );
};

export default App;
