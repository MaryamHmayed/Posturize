import React,{useState,useEffect} from 'react';
import { Image, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ConversationsScreen from '../physiotherapistScreens/chat';
import ProfileScreen from '../physiotherapistScreens/profile';
import PatientsStack from "../physiotherapistScreens/patientsStack";
import RecentChatsScreen from '../physiotherapistScreens/chat';
import ChatsStack from '../physiotherapistScreens/chatsStack';

const Tab = createBottomTabNavigator();

function PhysioTabs() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


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
          case 'Chats':
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
      tabBarStyle: { display: keyboardVisible ? 'none' : 'flex', backgroundColor: '#3D3A3A' },
      tabBarActiveTintColor: '#05A37E',  
      tabBarInactiveTintColor: '#ffff', 
      
    })}
  >
      <Tab.Screen name="Patients" component={PatientsStack} />
      <Tab.Screen name="Chats" component={ChatsStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default PhysioTabs;