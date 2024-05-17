import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';


const PostureTipsScreen = () =>{
return(
    <View style={styles.container}>
        <View>
            <Image
            style={styles.gif}
            source={require('../../assets/postureGIFs/400x400_24_Standing_Ab_Exercises_to_Strengthen_and_Define_Your_Core_Chest_Opener.gif')}
            />
            <Text>Opening and stretching your chest is especially useful if you spend most of your day sitting, which tends to make your chest move inward.</Text>
        </View>
        <View>
            <Image
            style={styles.gif}
            source={require('../../assets/postureGIFs/Childs-Pose.gif')}
            />
            <Text>Child’s pose stretches and lengthens your spine, glutes, and hamstrings. It may also release tension in your lower back and neck.</Text>
        </View>
        <View>
            <Image
            style={styles.gif}
            source={require('../../assets/postureGIFs/400x400_The_Pilates_Exercises_that_Worked_Wonders_on_My_Pregnancy_Back_Pain_Arm_Rows.gif')}
            />
            <Text>Isometric pulls work your shoulder, arm, and back muscles, giving you the strength to maintain good posture.</Text>
        </View>
    </View>
)
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3D3A3A',
    },
    gif: {
      width: 200, 
      height: 200,
    },
  });
  
  export default PostureTipsScreen;