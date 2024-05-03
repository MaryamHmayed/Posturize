import React from 'react';
import { View, StyleSheet } from 'react-native';

import StatusCard from './homeComponents/statusCard';

const HomeScreen = () => {
    const statusInfo = {
        title: "Your current posture is flawless, keep it up!",
        time: "You've been sitting for 1:30 now"
    };

    return (
        <View style={styles.container}>
            <StatusCard title={statusInfo.title} time={statusInfo.time} />
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#263238',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        padding: 10
    }
});

export default HomeScreen;