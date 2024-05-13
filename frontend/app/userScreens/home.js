import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DataCard from "./homeComponents/dataCard"
import StatusCard from './homeComponents/statusCard';
import { useSensorData } from '../sensorDataContext';

const HomeScreen = () => {
    const { elapsedTime, postureStatus, posturePercentages ,postureDurations} = useSensorData();

    const statusInfo = {
        title: `Your current posture is ${postureStatus}, keep it up!`,
        time: `You've been sitting for ${elapsedTime}`,
        imageUri: require('../../assets/home-imgs/sitting-posture-at-desk_1__2_-removebg-preview.png')
    };

    const data = [
        { title: "Good posture", percentage: posturePercentages.good.toFixed(1), time: postureDurations.good },
        { title: "Bad posture", percentage: posturePercentages.bad.toFixed(1), time: postureDurations.bad },
        { title: "Break time", percentage: posturePercentages.break.toFixed(1), time: postureDurations.break },
    ];

    return (
        <View style={styles.container}>
            <StatusCard title={statusInfo.title} time={statusInfo.time} imageUri={statusInfo.imageUri} />
            <View>
                <Text style={styles.session}>   Today's Session</Text>
                <Text style={[styles.trackedHrs, styles.totalHours]}>{elapsedTime}</Text>
                <Text style={styles.trackedHrs}>hours tracked</Text>
            </View>
            {data.map((item, index) => (
                <DataCard
                    key={index}
                    title={item.title}
                    percentage={item.percentage}
                    time={item.time}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3A3A',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'column',
        gap: 10,
    },
    trackedHrs: {
        color: "#fff",
        fontSize: 16,
        alignSelf: "center"
    },
    totalHours: {
        fontSize: 47,
        fontWeight: "bold"
    },
    session: {
        fontSize: 21,
        color: "#fff",
        fontWeight: "500"
    }
});

export default HomeScreen;