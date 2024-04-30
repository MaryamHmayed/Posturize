import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity,Pressable } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TopLeftCorner from '../assets/Vector.png';
import TopRightCorner from '../assets/Vector-1.png';
import BottomLeftCorner from '../assets/Vector-2.png';
import BottomRightCorner from '../assets/Vector-3.png';
import { Checkbox } from 'react-native-paper';


const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [isPhysiotherapist, setIsPhysiotherapist] = useState(false);


  const handleSignUp = () => {
    

  };

  const handleGoogleSignUp = () => {
    
  };

  const handleFacebookSignUp = () => {
   
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

      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
      />
    
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

    <View style={styles.checkboxContainer}>
        <View style={styles.checkboxLabelContainer}>
          <Checkbox
            status={isUser ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsUser(!isUser);
              setIsPhysiotherapist(false); // 
            }}
            color={'#FFF'} 
          />
          <Text style={styles.checkboxLabel}>User</Text>
        </View>
        <View style={styles.checkboxLabelContainer}>
          <Checkbox
            status={isPhysiotherapist ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsPhysiotherapist(!isPhysiotherapist);
              setIsUser(false); 
            }}
            color={'#FFF'} 
          />
          <Text style={styles.checkboxLabel}>Physiotherapist</Text>
        </View>
    </View>
      
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
    <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Pressable onPress={() => { /* navigate to login screen */ }}>
          <Text style={styles.loginLink}>Log In</Text>
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
    gap: 0,
  },
 
  checkboxContainer: {
    flexDirection: 'row',
    gap:6,
    
    marginVertical: 10,
  },
  checkboxLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"flex-start"
  },
  checkboxLabel: {
    color: '#FFF',
    
  },
  
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,

   
  },
  loginText: {
    color: '#FFF',
  },

  loginLink: {
    color: '#FFA500', // Replace with your link color
    textDecorationLine: 'underline',
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
    marginBottom:10
  },
  button: {
    marginTop:10,
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
  signupText: {
    color: '#ffff',
  },
  signupbutton: {
    color: '#ffff',
   textDecorationLine: "underline",

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
});

export default SignUpScreen;