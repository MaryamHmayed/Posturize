import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const EmptyHomeScreen = () => {
    return (
        <View style={styles.container}>
            <View  style={styles.smallerContainer}>
            <Text style={styles.headerText}>Connect your chair to start the session</Text>
            <Image 
                source={require('../assets/sideChair.png')}
                style={styles.image}
            />
            <TouchableOpacity style={styles.button} onPress={() => console.log('Go to Setup')}>
                <Text style={styles.buttonText}>Go to Setup</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#3D3A3A', 
    },
    headerText: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 30,
        textAlign:"center",
        paddingHorizontal:40
    },
    image: {
        width: 400, 
        height: 400,
        marginBottom: 20,
        alignSelf:"center"
    },
    button: {
        backgroundColor: '#FFA500',
        padding: 7,
        borderRadius: 5,
        width:150,
        alignSelf:"center"
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign:"center",
        fontWeight:"bold"
    },
    smallerContainer:{
        backgroundColor:"#504B4B",
        width:290,
        height:590,
        paddingTop:20

    }
    
});

export default EmptyHomeScreen;
