import { Image,Keyboard } from 'react-native';
import React,{useState,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../userScreens/home';
import ProgressScreen from '../userScreens/progress';
import ProfileScreen from '../userScreens/profile';
import SetupScreen from '../userScreens/setup';
import PhysiotherapistsScreen from '../userScreens/Pts/pts';
import PhysiotherapistsStack from '../userScreens/Pts/ptsStack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
            case 'Home':
              iconName = require('../../assets/home.png');
              break;
            case 'PTs':
              iconName = require('../../assets/pts.png');
              break;
            case 'Setup':
              iconName = require('../../assets/setup-icon.png');
              break;
            case 'Progress':
              iconName = require('../../assets/progress.png');
              break;
            case 'Profile':
              iconName = require('../../assets/profile-icon.png');
              break;
            default:
              iconName = require('../../assets/pts-icon.png'); 
          }

          return <Image source={iconName} style={{ width: iconSize, height: iconSize,tintColor: tintColor }} resizeMode="cover" />;
        },
        tabBarStyle: { display: keyboardVisible ? 'none' : 'flex', backgroundColor: '#3D3A3A' },
        tabBarActiveTintColor: '#05A37E',  
        tabBarInactiveTintColor: '#ffff', 
         
      })}
    >


      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PTs" component={PhysiotherapistsStack} />
      <Tab.Screen name="Setup" component={SetupScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
      
    </Tab.Navigator>
  );
};

export default Tabs;