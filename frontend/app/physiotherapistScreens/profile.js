import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from "react-native-paper";



const ProfileScreen = ()=>{



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity>
                    <Icon name="edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.profileImageContainer}>
                <Image source={require('../../assets/profileImage.png')} style={styles.profileImage} />
            </View>
            
            <View style={styles.infoContainer}>
                <Text style={styles.name}>John</Text>
                <TextInput style={styles.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida, tortor dapibus ornare.</TextInput>
            </View>
            








        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3D3A3A', 
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 50,
      paddingHorizontal:40,
      backgroundColor:"black",
  
    },
    headerTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    profileImageContainer:{
      backgroundColor: '#000', 
      height:60
    },
    profileImage: {
      width: 130,
      height: 130,
      position:"absolute",
      alignSelf: 'center',
      marginTop:0
      
    },
    infoContainer:{
        padding:20

    },
    name:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',

    },
    bio:{
        fontSize: 16,
        color: 'white',
        marginBottom: 20,

    }

})

export default ProfileScreen;