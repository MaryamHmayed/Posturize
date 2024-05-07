import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TopLeftCorner from '../assets/Vector.png';
import TopRightCorner from '../assets/Vector-1.png';
import BottomLeftCorner from '../assets/Vector-2.png';
import BottomRightCorner from '../assets/Vector-3.png';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './userContext';


const LoginScreen = () => {

    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const { user, updateUser } = useUser();
    
    

    const loginUser = async (email, password) => {
      try {
        const response = await axios.post('http://192.168.1.109:8000/api/login', { email, password });
        return response.data;
      } catch (error) {
        if (error.response) {
          throw error.response.data;
        } else {
          throw { general: "Unable to connect to the server. Please try again later." };
        }
      }
    };
    

    const handleLogin = async () => {
        try {
            const data = await loginUser(credentials.email, credentials.password);
            
            updateUser({
              email: data.user.email,
              username: data.user.username,
              token: data.authorisation?.token,
              role_id: data.user.role_id.toString(),
              error: '',  
            });
            // console.log(data.user.role_id)
            navigation.navigate ( 'Main' )
            
      
          } catch (error) {
            updateUser({ error: error.message || 'Incorrect email or password' });
          }
        };
      




  return (
    <View style={styles.container}>
      
      <Image source={TopLeftCorner} style={[styles.cornerImage, styles.topLeft]} />
      <Image source={TopRightCorner} style={[styles.cornerImage, styles.topRight]} />
      <Image source={BottomLeftCorner} style={[styles.cornerImage, styles.bottomLeft]} />
      <Image source={BottomRightCorner} style={[styles.cornerImage, styles.bottomRight]} />
      <View style={styles.logoContainer}>
        <Image source={require("../assets/logo-posturize.png")}/>
      
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={credentials.email}
        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
                
      />
      {user.error ? <Text style={styles.error}>{user.error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Pressable onPress={() => { navigation.navigate('Signup')}}>
          <Text style={styles.signupLink}>Sign up</Text>
        </Pressable>
      </View>

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
    backgroundColor:"#3D3A3A"
  },
  logoContainer: {
    marginBottom: 20,
    
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
    borderRadius: 25,
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
    marginBottom: 0,
    
   
  },
  socialButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: "#ffff",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 38,
    borderRadius: 5,
    marginBottom: 20,
  },
  
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: '#FFF',
  },

  signupLink: {
    color: '#FFA500',
    textDecorationLine: 'underline',
  },

  cornerImage: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain', 
  },
 topLeft: {
    top: 0,
    left: 10,
   
  },
  topRight: {
    top: 37,
    right: 300,

  },
  bottomLeft: {
    bottom: -10,
    left: 290,
   
  },
  bottomRight: {
    bottom: -32,
    right:0,
    
  },
  error: {
    color: 'red',
    marginBottom: 10
}
});


export default LoginScreen;