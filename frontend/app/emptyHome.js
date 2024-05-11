import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Connect your chair to start the session</Text>
            <Image 
                source={require('./path-to-your-chair-image.png')}
                style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={() => console.log('Go to Setup')}>
                <Text style={styles.buttonText}>Go to Setup</Text>
            </TouchableOpacity>
        </View>
    );
};
