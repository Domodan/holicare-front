import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../useAuth/useAuth';

const RequireAuth = ({ roles }) => {
    const { auth, authed } = useAuth();
    const location = useLocation();

    // console.log('====================================');
    // console.log("Logged In Role:", auth.role);
    // console.log("Passed Role:", roles)
    // console.log("Location:", location);
    // console.log("Username:", auth.username);
    // console.log('====================================');
    // if (authed && (roles.includes(auth.role))) {
        
    // }

    return (
        (authed && (roles.includes(auth.role)))
            ? <Outlet />
            :(auth?.username && auth.role === "DOCTOR")
                ? <Navigate to={"/doctor_dashboard"} state={{ from: location }} replace />
                : (auth?.username)
                    ? <Navigate to={"/dashboard"} state={{ from: location }} replace />
                    : <Navigate to={"/sign_in"} state={{ from: location }} replace />
    )
}

export default RequireAuth