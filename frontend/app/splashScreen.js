import {Pressable, View, StyleSheet, Image,Text, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';


const splashScreen = () =>{
   const navigation = useNavigation();

   useEffect(() => {
       const timer = setTimeout(() => {
           navigation.navigate('Login');
       }, 6000); // Wait for 3 seconds

       return () => clearTimeout(timer); // Clean up the timer
   }, [navigation]);




    return(
     <View>
        <Text style={styles.text_Style} >Ready to start improving your posture?</Text>
        <Text style={styles.caption} >We got your BACK!</Text>
        <Image  style={styles.chair} source={require("../assets/logolarge.png")}/>
    </View> 
    )
}


const styles = StyleSheet.create({
 text_Style: {
    color: '#ffff',
    fontWeight: 'bold',
    paddingTop: 120,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 23,
 }, 
 caption: {
    color:"#ffff",
    fontSize: 23,
    textAlign: "center",


 },
 chair:{
    marginLeft:10,
   
 }
})
export default splashScreen;