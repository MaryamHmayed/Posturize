import React from 'react';
import { useConnection } from './connectionContext';
import HomeScreen from './userScreens/home';
import EmptyHomeScreen from './emptyHome';


const DynamicHome = () => {
    const { isConnected } = useConnection();

    return (
        isConnected ? 
        <HomeScreen /> : 
        <EmptyHomeScreen />
    );
};

export default DynamicHome;