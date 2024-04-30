import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './app/splashScreen';
import LoginScreen from './app/login';
import SignUpScreen from './app/register';
import BottomNavigationBar from './app/Components/bottomNav';
import { UserProvider } from './app/userContext';


export default function App() {
  return (
    
    <View style={styles.container}>
      <UserProvider>
            <SignUpScreen />
            
        </UserProvider>
      {/* <SplashScreen/> */}
      {/* <LoginScreen/> */}
      {/* <SignUpScreen/> */}
      {/* <BottomNavigationBar/> */}
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#3D3A3A",
  },
  
});


