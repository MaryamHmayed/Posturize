import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhysiotherapistsScreen from './pts';
import ChatScreen from './chat';

const Stack = createNativeStackNavigator();

const PatientsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Patients" component={PatientScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default PatientsStack;