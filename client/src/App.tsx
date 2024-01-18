import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import { authenticate } from './store/session';
import { useAppDispatch } from './hooks';

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    useEffect(() => {
        dispatch(authenticate())
            .then((result) => {
                if (authenticate.fulfilled.match(result)) {
                    setIsLoaded(true);
                }
            })
            .catch((error: Error) => {
                console.error({ Error: error, Message: 'Error authenticating!' });
            });
    }, [dispatch]);

    // https://reactrouter.com/en/main/route/route - this is v6 of browserrouter
    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginFormPage />} />
                        <Route path="/signup" element={<SignupFormPage />} />
                    </Routes>
                </Router>
            )}
        </>
    );
};

export default App;
