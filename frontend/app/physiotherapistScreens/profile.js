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
                <TextInput placeholder="Bio"style={styles.bio}
                    placeholderTextColor="#999"
                //    value={bio}
                //    onChangeText={setBio}
                   multiline
                   numberOfLines={3} 
                   underlineColorAndroid="transparent"
                >
                </TextInput>
                <Text style={styles.sectionTitle}>Location</Text>
                <TextInput 
                // value={location}
                // onChangeText={setLocation}
                style={styles.input}
                />
                <Text style={styles.sectionTitle}>Phone number</Text>
                <TextInput 
                // value={phoneNumber}
                // onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType='phone-pad'
                />
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
      height:60,
      
    },
    profileImage: {
      width: 130,
      height: 130,
      position:"absolute",
      alignSelf: 'center',
      marginTop:0
      
    },
    infoContainer:{
        marginTop:80,
        justifyContent:"space-between",
        gap:5

        

    },
    name:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
        alignSelf:"center"
        
    },
    bio:{
        fontSize: 16,
        backgroundColor: 'transparent',
        color:"white",
        borderWidth:1,
        borderColor:"#ffff",
        width:"85%",
        borderRadius:5,
        textAlignVertical: 'top',
        marginLeft:27
     

    },
    sectionTitle:{
        marginLeft:27,
        fontSize:16,
        color:"#fff"
     

    },
    input:{
        fontSize: 16,
        backgroundColor: 'transparent',
        color:"white",
        borderWidth:1,
        borderColor:"#ffff",
        width:"85%",
        borderRadius:5,
        textAlignVertical: 'top',
        marginLeft:27,
        height:40
     

    }


})

export default ProfileScreen;