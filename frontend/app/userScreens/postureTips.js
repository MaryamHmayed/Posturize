import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';


const PostureTipsScreen = () =>{
return(
    <View style={styles.container}>
    <Image
      style={styles.gif}
      source={require('../../assets/postureGIFs/400x400_24_Standing_Ab_Exercises_to_Strengthen_and_Define_Your_Core_Chest_Opener.gif')}
    />
    <Text>Opening and stretching your chest is especially useful if you spend most of your day sitting, which tends to make your chest move inward.</Text>
  </View>
)
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    gif: {
      width: 200,
      height: 200,
    },
  });
  
  export default PostureTipsScreen;