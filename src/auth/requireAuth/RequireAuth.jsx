import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../useAuth/useAuth';

const RequireAuth = () => {
    const { auth, authed } = useAuth();
    const location = useLocation();

    const access_token = localStorage.getItem("access_token");

    return (
        (authed && (auth.access_token === access_token))
            ? <Outlet />
            : <Navigate to={"/sign_in"} state={{ from: location }} replace />
    )
}

export default RequireAuth