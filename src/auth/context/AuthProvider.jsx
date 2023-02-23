import React, {createContext, useState} from 'react';

const authContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [authed, setAuthed] = useState(false);
    return (
        <authContext.Provider value={{auth, setAuth, authed, setAuthed}}>
            { children }
        </authContext.Provider>
    )
}

export default authContext;