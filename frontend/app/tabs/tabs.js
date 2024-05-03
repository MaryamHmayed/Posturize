import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../userScreens/home';
import ProgressScreen from '../userScreens/progress';
import ProfileScreen from '../userScreens/profile';
// import PhysiotherapistsStack from '../userScreens/Pts/PhysiotherapistsStack';
import SetupScreen from '../userScreens/setup';
import PhysiotherapistsScreen from '../userScreens/Pts/pts';

const Tab = createBottomTabNavigator();

const Tabs = () => {

  return (

    
       <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarIcon: ({ focused }) => {
          let iconName;
          const iconSize =  25; 
          const tintColor= focused ?'#05A37E':"#ffff"

          switch (route.name) {
            case 'Home':
              iconName = require('../../assets/home-icon.png');
              break;
            case 'PTs':
              iconName = require('../../assets/pts-icon.png');
              break;
            case 'Setup':
              iconName = require('../../assets/setup-icon.png');
              break;
            case 'Progress':
              iconName = require('../../assets/progress-icon.png');
              break;
            case 'Profile':
              iconName = require('../../assets/profile-icon.png');
              break;
            default:
              iconName = require('../../assets/pts-icon.png'); 
          }

          return <Image source={iconName} style={{ width: iconSize, height: iconSize,tintColor: tintColor }} resizeMode="cover" />;
        },
        tabBarActiveTintColor: '#05A37E',  
        tabBarInactiveTintColor: '#ffff', 
        tabBarStyle: { backgroundColor: '#3D3A3A' },  
      })}
    >


      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PTs" component={PhysiotherapistsScreen} />
      <Tab.Screen name="Setup" component={SetupScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      
    </Tab.Navigator>
  );
};

export default Tabs;