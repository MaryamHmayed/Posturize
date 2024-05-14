import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id : null,
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


    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
    };

    const clearNotifications = () => {
        setNotifications([]);
    };


    return (
        <UserContext.Provider value={{ user, updateUser, notifications, addNotification, clearNotifications  }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);