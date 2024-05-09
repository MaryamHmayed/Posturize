import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientsScreen from '../physiotherapistScreens/patients';
import ChatScreen from '../physiotherapistScreens/chat';

const Stack = createNativeStackNavigator();

const PatientsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Patients" component={PatientsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default PatientsStack;