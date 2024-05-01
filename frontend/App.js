import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './app/splashScreen';
import LoginScreen from './app/login';
import SignUpScreen from './app/register';

import { UserProvider } from './app/userContext'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetupScreen from './app/userScreens/setup';
import ProfileScreen from './app/userScreens/profile';
import PhysiotherapistsScreen from './app/userScreens/Pts/pts';
import ChatScreen from './app/userScreens/Pts/chat';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <View style={styles.container}>
      {/* <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="splashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider> */}
  
   {/* <SetupScreen/> */}
   {/* <ProfileScreen/> */}
   {/* <PhysiotherapistsScreen/> */}
   <ChatScreen/>
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


