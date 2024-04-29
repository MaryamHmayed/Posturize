import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-posturize.png")}/>
      
      </View>
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <Text style={styles.or}>Or</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="white" />
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
    gap:10,
  },
  logoContainer: {
    marginBottom: 30,
    
  },
  logo: {
   
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    alignSelf: "flex-start",
    paddingLeft:35,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    marginTop:30,
    backgroundColor: '#ff9500',
    borderRadius: 30,
    width: '80%',
    height: 32,
    alignItems: 'center',
    display: "flex",
    alignItems:"center",
    justifyContent:"center",

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:14,

  },
  or: {
    color: 'white',
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around',
    marginBottom: 20,
   
  },
  socialButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#ffff",
    borderWidth: 1
  },
  signupText: {
    color: '#ff9500',
  },
});

export default LoginScreen;