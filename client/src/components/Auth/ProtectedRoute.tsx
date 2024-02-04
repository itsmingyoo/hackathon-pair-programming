import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
    loggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, loggedIn }) => {
    if (!loggedIn) {
        // Redirect to the login page if not authenticated
        // console.log('Protected Route: User is not logged in.');
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
