import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Text style={styles.headerButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Icon name="edit" size={24} color="white" />  
        </TouchableOpacity>
      </View>
      
      <Image
        source={require('../../assets/logo-posturize.png')} 
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>Amanda</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Track your progress</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Connect Now</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3D3A3A',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor:"black"
    },
    headerButton: {
      fontSize: 18,
      color: 'white',
    },
    headerTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    headerIcon: {
      width: 24,
      height: 24,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50, 
      alignSelf: 'center',
      marginTop: 20,
    },
    profileName: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      marginVertical: 10,
    },
    button: {
      backgroundColor: '#FFA500', 
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 50,
      marginTop: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    }
  });


  export default ProfileScreen;