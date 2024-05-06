import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import React,{useState, useEffect} from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from "react-native-paper";



const ProfileScreen = ()=>{
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
   
  
   


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
                <Text style={styles.sectionTitle}>Bio</Text>
                <TextInput style={styles.bio}
                   value={bio}
                   onChangeText={setBio}
                   multiline
                   numberOfLines={3} 
                   underlineColorAndroid="transparent"
                >
                </TextInput>
                <Text style={styles.sectionTitle}>Location</Text>
                <TextInput 
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                />
                <Text style={styles.sectionTitle}>Phone number</Text>
                <TextInput 
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType='phone-pad'
                />
            </View>
            <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>









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
      marginBottom:90
      
      
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
        borderColor:"#999",
        width:"83%",
        borderRadius:5,
        textAlignVertical: 'top',
        marginLeft:30
     

    },
    sectionTitle:{
        marginLeft:30,
        fontSize:16,
        color:"#fff"
     

    },
    input:{
        fontSize: 16,
        backgroundColor: 'transparent',
        color:"white",
        borderWidth:1,
        borderColor:"#999",
        width:"83%",
        borderRadius:5,
        textAlignVertical: 'top',
        marginLeft:30,
        height:40
    },
    button: {
        backgroundColor: '#FFA500', 
        borderRadius: 8,
        paddingVertical: 9,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        marginTop: 40,
        alignItems: 'center',
        
      },
    buttonText:{
      color:"#fff",
      fontWeight:"bold"
    }



})

export default ProfileScreen;