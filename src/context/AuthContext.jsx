// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//     }, []);

//     const login = (userData) => {
//         setUser(userData);
//         localStorage.setItem('user', JSON.stringify(userData));
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
// export default AuthContext;



import { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    });

    return (
        <AuthContext.Provider value={{user, authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
