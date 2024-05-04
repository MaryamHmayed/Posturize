import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,StyleSheet, Text, View } from 'react-native';
import SplashScreen from './app/splashScreen';
import LoginScreen from './app/login';
import SignUpScreen from './app/register';
import { UserProvider } from './app/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './app/tabs/userTabs';
import PhysioTabs from './app/tabs/physioTabs';
import PatientsScreen from './app/physiotherapistScreens/patients';

const Stack = createNativeStackNavigator();

export default function App() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const loadUserType = async () => {
      const type = await AsyncStorage.getItem('userType');
      setUserType(type);
    };
    loadUserType();
  }, []);


  // if (userType === null) {
  //   return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>;
  // }

  return (
    
    <View style={styles.container}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="splashScreen">
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={userType === 'physiotherapist' ? PhysioTabs : Tabs} options={{ headerShown: false }} /> */}
             {/* <Stack.Screen name="patients" component={PatientsScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Main" component={ PhysioTabs} options={{ headerShown: false }} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
  
  
   
   
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#3D3A3A",
  },
  
});


