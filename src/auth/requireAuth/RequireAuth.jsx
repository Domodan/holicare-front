import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import useAuth from '../useAuth/useAuth';

const RequireAuth = () => {
    const { authed } = useAuth();
    const location = useLocation();
    return (
        (authed)
            ? <Outlet />
            : <Navigate to={"/sign_in"} state={{ from: location }} replace />
    )
}

export default RequireAuth