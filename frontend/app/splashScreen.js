import {Pressable, View, StyleSheet, Image,Text, TouchableOpacity} from "react-native";


export default splashScreen = () =>{
    return(
     <View>
        <Text style={styles.text_Style} >Ready to start improving your posture?</Text>
        <Text style={styles.caption} >We got your BACK!</Text>
        <Image  style={styles.chair} source={require("../assets/2024-03-30-removebg-preview 1 (1).png")}/>
    </View> 
    )
}


const styles = StyleSheet.create({
 text_Style: {
    color: '#05A37E',
    fontWeight: 'bold',
    paddingTop: 110,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 25,
 }, 
 caption: {
    color:"#FE9120",
    fontSize: 23,
    textAlign: "center",


 },
 chair:{
    marginLeft:30,
   
 }
})