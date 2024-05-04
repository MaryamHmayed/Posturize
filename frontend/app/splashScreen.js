import {Pressable, View, StyleSheet, Image,Text, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';


const SplashScreen = () =>{
   const navigation = useNavigation();

   useEffect(() => {
       const timer = setTimeout(() => {
           navigation.navigate('Login');
       }, 3000); 

       return () => clearTimeout(timer); 
   }, [navigation]);


    return(
     <View style={styles.container}>
        <Text style={styles.text_Style} >Ready to start improving your posture?</Text>
        <Text style={styles.caption} >We got your BACK!</Text>
        <Image  style={styles.chair} source={require("../assets/smlChair.png")}/>
    </View> 
    )
}


const styles = StyleSheet.create({
   container:{
      backgroundColor:"#3D3A3A",
      flex:1,

   },

 text_Style: {
    color: '#ffff',
    fontWeight: 'bold',
    paddingTop: 100,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 23,
 }, 
 caption: {
    color:"#ffff",
    fontSize: 21,
    textAlign: "center",
    paddingRight:5


 },
 chair:{
    
    marginTop:20,
    width:"80%",
    marginLeft:40
    
    

   
   
 }
})
export default SplashScreen;