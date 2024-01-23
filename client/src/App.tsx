import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import { authenticate } from './store/session';
import { useAppDispatch } from './hooks';
import LandingPage from './components/LandingPage';
import VideoTest from './components/VideoTest';
import AddTwoSum from './components/DSAProblems/add-two-sum';
import VideoTest2 from './components/VideoTest/index2';
import Footer from './components/Footer';
import HomePage from './components/HomePage';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(() => {
        dispatch(authenticate())
            .then((result) => {
                if (authenticate.fulfilled.match(result)) {
                    setIsLoaded(true);
                    // console.log('is it loaded', isLoaded);
                } else {
                    console.log('authentication result doesnt match', result);
                }
            })
            .catch((error: Error) => {
                console.error({ Error: error, Message: 'Error authenticating!' });
            });
    }, [dispatch]);
    console.log('is it loaded', isLoaded);
    // https://reactrouter.com/en/main/route/route - this is v6 of browserrouter
    return (
        <>
            {isLoaded && (
                <Router>
                    <Navigation isLoaded={isLoaded} />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path="/login" element={<LoginFormPage />} />
                        <Route path="/signup" element={<SignupFormPage />} />
                        <Route path="/video-test" element={<VideoTest />} />
                        <Route path="/add-two-sum" element={<AddTwoSum />} />
                        {/* Add more problems here */}
                        <Route path="/video-test-2" element={<VideoTest2 />} />
                    </Routes>
                    <Footer />
                </Router>
            )}
        </>
    );
};

export default App;
