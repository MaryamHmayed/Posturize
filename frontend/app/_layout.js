import React, { useState } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigationBar from './tabScreens/bottomNav';
// import HomeScreen from './screens/HomeScreen';
// import PTsScreen from './screens/PTsScreen';
import SetupScreen from './screenTabs/setup';



const SetupStack = createNativeStackNavigator();
// const HomeStack = createNativeStackNavigator();
// const PTsStack = createNativeStackNavigator();
// other stacks


function SetupStackScreens() {
  return (
    <SetupStack.Navigator>
      <SetupStack.Screen name="Setup" component={SetupScreen} />
      // Add more Home stack screens if needed
    </SetupStack.Navigator>
  );
}




// function HomeStackScreens() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       // Add more Home stack screens
//     </HomeStack.Navigator>
//   );
// }

// function PTsStackScreens() {
//   return (
//     <PTsStack.Navigator>
//       <PTsStack.Screen name="PTs" component={PTsScreen} />
//       // Add more PTs stack screens 
//     </PTsStack.Navigator>
//   );
// }



export default function Layout() {
  const [currentTab, setCurrentTab] = useState('Setup');

  return (
    <View style={{ flex: 1 }}>
        {currentTab === 'Setup' && <SetupStackScreens />}
        {/* {currentTab === 'Home' && <HomeStackScreens />} */}
        {/* {currentTab === 'PTs' && <PTsStackScreens />} */}
        // Add other conditions for other tabs
        <BottomNavigationBar setCurrentTab={setCurrentTab} />
    </View>
  );
}