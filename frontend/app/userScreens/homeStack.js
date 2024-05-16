import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home';
import NotificationsScreen from './notifications';


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="notifications" component={NotificationsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default HomeStack;