import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';



const StatusCard = ({ title, time, imageUri }) => {
    return (
        <View style={styles.container}>
            
            <LinearGradient
            colors={['#05A37E', '#04765B', '#04765B']} 
            style={styles.background}>
            <Image source={imageUri } style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{time}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 360,  
        height: 150, 
        marginBottom:10,
        marginTop:100,
        
    },

    image: {
        position: 'absolute',
        right:0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        
    },
    time: {
        fontSize: 16,
        color: 'white',
        marginTop: 10
    },
    background:{
        width: '80%',
        height:150,
        paddingHorizontal:7,
        justifyContent: 'center',
        borderRadius:7,
    }
});

export default StatusCard;