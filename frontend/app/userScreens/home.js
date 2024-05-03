import React from 'react';
import { View, StyleSheet } from 'react-native';

import StatusCard from './homeComponents/statusCard';

const HomeScreen = () => {
    const statusInfo = {
        title: "Your current posture is flawless, keep it up!",
        time: "You've been sitting for 1:30 now",
        imageUri: require('../../assets/home-imgs/sitting-posture-at-desk 1.png')
    };

    return (
        <View style={styles.container}>
            <StatusCard title={statusInfo.title} time={statusInfo.time} imageUri={statusInfo.imageUri} />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3A3A',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        padding: 10
    }
});

export default HomeScreen;