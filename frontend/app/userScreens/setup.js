import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SetupScreen = () => {
  const [chairName, setChairName] = useState('');

  return (
    <View style={styles.container}>
      <Text  style={styles.header} >Setup</Text>
      
      <Text style={styles.header}>Let's set your chair</Text>
      <Image
        source={require('../../assets/sideChair.png')} 
        style={styles.chairImage}
      />
      <Text style={styles.text}>Add your chair name here</Text>
      <TextInput
        style={styles.input}
        onChangeText={setChairName}
        value={chairName}
        placeholder="chair name "
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Connecting to:', chairName)}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
      
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
    fontWeight:"500"
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
    marginTop:10,
    display:"flex",
    justifyContent:"center",
    alignContent: "center"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"

  },
  text:{
    color: 'white',
    marginRight:125
  }
});


export default SetupScreen;





