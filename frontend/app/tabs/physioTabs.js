import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../physiotherapistScreens/chat';
// import PatientsScreen from '../physiotherapistScreens/patients';
import ProfileScreen from '../physiotherapistScreens/profile';
import PatientsStack from "../physiotherapistScreens/patientsStack";

const Tab = createBottomTabNavigator();

function PhysioTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, 
      tabBarIcon: ({ focused }) => {
        let iconName;
        const iconSize =  24; 
        const tintColor= focused ?'#05A37E':"#ffff"

        switch (route.name) {
          case 'Patients':
            iconName = require('../../assets/patients.png');
            break;
          case 'Chat':
            iconName = require('../../assets/chats.png');
            break;
          case 'Profile':
            iconName = require('../../assets/profile-icon.png');
            break;
          default:
            iconName = require('../../assets/chat.png'); 
        }

        return <Image source={iconName} style={{ width: iconSize, height: iconSize,tintColor: tintColor }} resizeMode="cover" />;
      },
      tabBarActiveTintColor: '#05A37E',  
      tabBarInactiveTintColor: '#ffff', 
      tabBarStyle: { backgroundColor: '#3D3A3A' },  
    })}
  >
      <Tab.Screen name="Patients" component={PatientsStack} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default PhysioTabs;