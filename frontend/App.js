import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './app/splashScreen';
import Login from './app/login';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SplashScreen/> */}
      <Login/>
    
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
