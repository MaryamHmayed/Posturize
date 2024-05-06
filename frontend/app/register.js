import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import TopLeftCorner from '../assets/Vector.png';
import TopRightCorner from '../assets/Vector-1.png';
import BottomLeftCorner from '../assets/Vector-2.png';
import BottomRightCorner from '../assets/Vector-3.png';
import { Checkbox } from 'react-native-paper';
import {registerUser} from './api';
import { useUser } from './userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
  const navigation = useNavigation();
  const { user, updateUser } = useUser();
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState(null); 



const handleSignUp = async () => {
  if (!userType) {
    setErrors({ ...errors, userType: 'Please select a user type.' });
    return;
  }
  const role_id = userType === 'physiotherapist' ? 1 : 2;
    try {
        const data = await registerUser({
            email: user.email,
            username: user.username,
            password: user.password,
            role_id: role_id
            });
            await AsyncStorage.setItem('userToken', data?.authorisation?.token);  
            await AsyncStorage.setItem('userType', userType);
            
            console.log('Registration successful:', data);
           
            setErrors({});  
            navigation.navigate('Login');

    } catch (error) {
        console.error('Registration failed:', error);
        setErrors(prevErrors => ({
          ...prevErrors,
          apiError: error.message || 'Failed to register. Please try again.'
        }));
        }
};
 

//   const handleGoogleSignUp = () => {
//   };

//   const handleFacebookSignUp = () => {
//   };

  return (
    <View style={styles.container}>

      <Image source={TopLeftCorner} style={[styles.cornerImage, styles.topLeft]} />
      <Image source={TopRightCorner} style={[styles.cornerImage, styles.topRight]} />
      <Image source={BottomLeftCorner} style={[styles.cornerImage, styles.bottomLeft]} />
      <Image source={BottomRightCorner} style={[styles.cornerImage, styles.bottomRight]} />
      <View >
        <Image source={require("../assets/logo-posturize.png")}/>
        </View>

      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={user.email}
        onChangeText={(text) => updateUser({ email: text })}
        onBlur={() => {
            if (!user.email.includes('@')) setErrors({...errors, email: 'Invalid email format'});
        }}
        
      />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

    
        <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        onChangeText={(text) => updateUser({ username: text })}
        onBlur={() => {
        if (user.username.length < 4) setErrors({...errors, username: 'Username must be at least 4 characters'});
        }}
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
        
        <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={user.password}
        onChangeText={(text) => updateUser({ password: text })}
        onBlur={() => {
            if (user.password.length < 8) setErrors({...errors, password: 'Password must be at least 8 characters'});
            }}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

    <View style={styles.checkboxContainer}>
        <View style={styles.checkboxLabelContainer}>
          <Checkbox 
            status={userType === 'user' ? 'checked' : 'unchecked'}
            onPress={() => setUserType(userType !== 'user' ? 'user' : null)}
            color={'#FFF'}
          />
          <Text style={styles.checkboxLabel}>User</Text>
        </View>
        <View style={styles.checkboxLabelContainer}>
          <Checkbox
           status={userType === 'physiotherapist' ? 'checked' : 'unchecked'}
           onPress={() => setUserType(userType !== 'physiotherapist' ? 'physiotherapist' : null)}
           color={'#FFF'}
          />
          <Text style={styles.checkboxLabel}>Physiotherapist</Text>
        </View>
        {errors.userType && <Text style={styles.errorText}>{errors.userType}</Text>}
    </View>
      
      
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText} >Sign up</Text>
      </TouchableOpacity>
      
    <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor:"#3D3A3A"
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
    color: '#FFA500', 
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
  errorText: {
    color: 'red',
    marginBottom: 10
}
});

export default SignUpScreen;