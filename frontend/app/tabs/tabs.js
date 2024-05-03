import React from 'react';
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
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Physiotherapists" component={PhysiotherapistsScreen} />
      <Tab.Screen name="Setup" component={SetupScreen} />
    </Tab.Navigator>
  );
};

export default Tabs;