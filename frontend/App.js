import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,StyleSheet, Text, View } from 'react-native';
import SplashScreen from './app/splashScreen';
import LoginScreen from './app/login';
import SignUpScreen from './app/register';
import { UserProvider,useUser } from './app/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './app/tabs/userTabs';
import PhysioTabs from './app/tabs/physioTabs';
import PostureData from './app/postureData';
import EmptyHomeScreen from './app/emptyHome';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      let storedRole = user.role_id;
      if (!storedRole) {
        const role = await AsyncStorage.getItem('userRole');
        if (role) storedRole = role;
      }
      setLoading(false);
    };
    loadUserRole();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Main"
        component={user.role_id === '1' ? PhysioTabs : Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <UserProvider>
        <NavigationContainer>
          {/* <AppNavigator /> */}
          <EmptyHomeScreen/>
        </NavigationContainer>
      </UserProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D3A3A",
    // paddingVertical:30
  },
});