import { View, StyleSheet, Text, Platform, Alert } from 'react-native';
import DataCard from "./homeComponents/dataCard";
import StatusCard from './homeComponents/statusCard';
import { useSensorData } from '../sensorDataContext';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../userContext';
import Constants from 'expo-constants';

// Set notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const HomeScreen = () => {
    const { elapsedTime, postureStatus, posturePercentages, postureDurations } = useSensorData();
    const { user, addNotification } = useUser();
    const notificationListener = useRef();
    const responseListener = useRef();
    const [badPostureStart, setBadPostureStart] = useState(null);
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log("Push notification token:", token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log('Notification received:', notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification response received:', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    useEffect(() => {
        if (postureStatus === 'bad') {
            if (!badPostureStart) {
                setBadPostureStart(new Date());
            } else {
                const now = new Date();
                const diff = now.getTime() - badPostureStart.getTime();
                if (diff >= 60000) {  
                    sendNotification();
                    setBadPostureStart(null);
                }
            }
        } else {
            setBadPostureStart(null);
        }
    }, [postureStatus, badPostureStart]);

    const sendNotification = async () => {
        const notificationContent = {
            title: 'Posture Alert!',
            body: 'Your posture has been bad for more than 15 minutes. Please adjust it!',
            data: { userId: user.id, timestamp: new Date() },
        };

        await Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: null,
        });

        addNotification(notificationContent);
    };

    const registerForPushNotificationsAsync = async () => {
        if (!Constants.isDevice) {
            Alert.alert('Device Requirement', 'Must use physical device for Push Notifications');
            return null;
        }

        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Notification Permission', 'Failed to get push token for push notification because permission was not granted.');
            return null;
        }
        
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo push token:', token);

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    };


    const postureAttributes = {
        good: {
            colors: ['#05A37E', '#04765B', '#04765B'],
            imageUri: require('../../assets/home-imgs/sitting-posture-at-desk 1.png'),
            title: 'Your current posture is flawless, keep it up!',
        },
        bad: {
            colors: ['#FE9120', '#985713'],
            imageUri: require('../../assets/home-imgs/sitting-posture-at-desk-cropped-removebg-preview (1) 1.png'),
            title: 'Your back is not liking this :(',
        },
        break: {
            colors: ['#02657C', '#026E87', '#027E9A'],
            imageUri: require('../../assets/home-imgs/sitting-posture-at-desk 1.png'),
            title: 'Break time!',
        },
    };

    const { colors, imageUri, title } = postureAttributes[postureStatus] || postureAttributes['good'];

    const statusInfo = {
        title,
        time: `You've been sitting for ${elapsedTime} hours`,
        imageUri,
    };

    const data = [
        {
            title: "Good posture",
            percentage: Number(posturePercentages.good).toFixed(1),
            time: postureDurations.good,
        },
        {
            title: "Bad posture",
            percentage: Number(posturePercentages.bad).toFixed(1),
            time: postureDurations.bad,
        },
        {
            title: "Break time",
            percentage: Number(posturePercentages.break).toFixed(1),
            time: postureDurations.break,
        },
    ];

  
    return (
        <View style={styles.container}>
            <StatusCard 
                title={statusInfo.title} 
                time={statusInfo.time} 
                imageUri={statusInfo.imageUri} 
                colors={colors}
            />
            <View>
                <Text style={styles.session}> Today's Session</Text>
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

