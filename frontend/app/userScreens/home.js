import React from 'react';
import { View, StyleSheet } from 'react-native';
import DataCard from "./homeComponents/dataCard"
import StatusCard from './homeComponents/statusCard';

const HomeScreen = () => {
    const statusInfo = {
        title: "Your current posture is flawless, keep it up!",
        time: "You've been sitting for 1:30 now",
        imageUri: require('../../assets/home-imgs/sitting-posture-at-desk 1.png')
    };
    const data = [
        { title: "Good posture", percentage: 64, time: "5:35" },
        { title: "Bad posture", percentage: 19, time: "1:50" },
        { title: "Break time", percentage: 17, time: "1:10" },
    ];


   

    return (
        <View style={styles.container}>
            <StatusCard title={statusInfo.title} time={statusInfo.time} imageUri={statusInfo.imageUri} />

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
        marginTop:100,
        flexDirection: 'column',
        gap:10
        }
});

export default HomeScreen;