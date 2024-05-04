import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';



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
      padding: 40,
      backgroundColor:"black",
      position:"relative"
    },
    headerTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    profileImage: {
      width: 130,
      height: 130,
      position:"absolute",
      alignSelf: 'center',
      marginTop:30
      
    },

})

export default ProfileScreen;