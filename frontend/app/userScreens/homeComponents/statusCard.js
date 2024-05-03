import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const StatusCard = ({ title, time, imageUri }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
            colors={['#05A37E', '#04765B', '#04765B']} 
            style={styles.background}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position:"relative"
    },

    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        margin:5
    },
    time: {
        fontSize: 16,
        color: 'white',
        marginTop: 5
    },
    background:{
        width: '80%',
        height:150,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default StatusCard;