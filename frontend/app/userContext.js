import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        token: null,
        role_id: null,  
        error: '',      
    });

    const updateUser = (updates) => {
        setUser((prevUser) => ({ ...prevUser, ...updates }));
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);