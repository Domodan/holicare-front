import { useEffect } from 'react';
import useAuth from '../../../auth/useAuth/useAuth';
import { Navigate} from 'react-router-dom';

const SignOut = ({to, from}) => {
    const { setAuth, setAuthed } = useAuth();

    useEffect(() => {
        setAuthed(false);
        setAuth("");
        localStorage.clear();
    })

    return <Navigate to={to} state={{ from: from }} replace />;
}

export default SignOut