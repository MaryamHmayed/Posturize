import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userContext';
import { useConnection } from '../connectionContext';
import { apiInstance } from '../route';

const SetupScreen = () => {
  const [chairName, setChairName] = useState('');
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const { user } = useUser();
  const { setConnectionStatus } = useConnection();


  const handleAddChair = async () => {
    try {
      const response = await apiInstance.post('add_chair', {
        chair_name: chairName, 
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        }
      });
      if (response.status === 201 || 200) {
        console.log( response.data);
        setConnectionStatus(true);
        navigation.navigate('Main', { screen: 'Home' })
      }
    } catch (error) {
      console.error('Failed to add chair:', error);
      Alert.alert("Error", `Failed to add chair: ${error.response.data.message || error.message}`);
    }
  };
  // verification for arduino
  const verifyCode = () => {
    if (code === "1234") {  
      console.log('Code verified, adding chair:', chairName);
      handleAddChair();
      setModalVisible(false);
    } else {
      Alert.alert("Invalid Code", "Please enter the correct code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let's set your chair</Text>
      <Image
        source={require('../../assets/sideChair.png')}
        style={styles.chairImage}
      />
      <TextInput
        style={styles.input}
        onChangeText={setChairName}
        value={chairName}
        placeholder="Enter chair name"
      />
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Verification Code</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={setCode}
              value={code}
              placeholder="Code"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.verifybutton} onPress={verifyCode}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D3A3A',
  },
  header: {
    fontSize: 22,
    color: 'white',
    marginBottom: 30,
    fontWeight: "500"
  },
  chairImage: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: '80%',
    backgroundColor: '#FFA500',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  text: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  verifybutton:{
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius:25
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalInput: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius:5
  }
});

export default SetupScreen;




