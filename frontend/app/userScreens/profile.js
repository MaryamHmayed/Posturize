import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select'; 
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [medicalCondition, setMedicalCondition] = useState('');
  
    return (
      <ScrollView style={styles.container}>
        
        <View  style={styles.imageContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Icon name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/profileImage.png')}
          style={styles.profileImage}
        />
        </View>
        <Text style={styles.profileName}>Amanda</Text>
  
        <TouchableOpacity style={[styles.button, styles.specialButton]} onPress={() =>{ navigation.navigate('Main', { screen: 'Progress' });}}>
          <Text style={styles.buttonText} >Track your progress</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.button, styles.specialButton]}>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>

        <Text style={styles.connectTitle}>Connect with a physiotherapist?</Text>
        <TouchableOpacity style={[styles.button, styles.connectButton]} onPress={() =>{ navigation.navigate('Main', { screen: 'PTs' });}}>
        <Text style={styles.buttonText}>Connect Now</Text>
        </TouchableOpacity>

        <Text style={styles.connectTitle}>Medical conditions</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setMedicalCondition(value)}
            items={[
              { label: 'Condition 1', value: 'condition1' },
              { label: 'Condition 2', value: 'condition2' },
              
            ]}
            placeholder={{ label: "Select your medical condition", value: null }}
            style={pickerSelectStyles}
          />
        </View>
  
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
      padding: 40,
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
      marginTop:90,
      
    },
    profileName: {
      fontSize: 20,
      color: 'white',
      fontWeight:"500",
      textAlign: 'center',
      paddingBottom:10,
      marginTop:70
    },
    button: {
      backgroundColor: '#FFA500', 
      borderRadius: 8,
      paddingVertical: 9,
      paddingHorizontal: 20,
      marginHorizontal: 30,
      marginTop: 15,
      alignItems: 'center',
    },
    buttonText:{
      color: "#fff",
      fontWeight:"500",


    },
    connectButton:{
      backgroundColor:"transparent",
      borderStyle:"solid",
      borderColor:"#fff",
      borderWidth:1,

    },
    specialButton: {
      backgroundColor: '#05A37E', 
    },
    pickerContainer: {
      paddingHorizontal: 30,
      marginVertical: 15,
    
    },
    connectTitle: {
      color: 'white',
      fontSize: 14,
      textAlign: 'left',
      marginTop: 20,
      paddingLeft:30,
    },

    imageContainer: {
      backgroundColor: '#000', 
    
      height:160
      
    }
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'white',
      paddingRight: 30, 
      backgroundColor: 'white', 
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
      backgroundColor: 'white',
    },
  });


  
  export default ProfileScreen;
