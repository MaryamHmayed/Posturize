import React from 'react';
import { useConnection } from '../connectionContext';
import HomeScreen from './home';
import EmptyHomeScreen from '../emptyHome';


const DynamicHome = () => {
    const { isConnected } = useConnection();

    return (
        isConnected ? 
        <HomeScreen /> : 
        <EmptyHomeScreen />
    );
};

export default DynamicHome;