import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select'; 

const ProfileScreen = () => {
    const [medicalCondition, setMedicalCondition] = useState('');
  
    return (
      <ScrollView style={styles.container}>
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
          source={require('../../assets/logo-posturize.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Amanda</Text>
  
        <TouchableOpacity style={[styles.button, styles.specialButton]}>
          <Text style={styles.buttonText}>Track your progress</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={[styles.button, styles.specialButton]}>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>
  
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
      padding: 30,
    },
    headerTitle: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
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
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: 28,
      marginTop: 30,
      alignItems: 'center',
    },
    specialButton: {
      backgroundColor: '#05A37E', 
    },
    pickerContainer: {
      paddingHorizontal: 30,
      marginVertical: 20,
    },
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
