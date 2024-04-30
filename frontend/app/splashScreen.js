import {Pressable, View, StyleSheet, Image,Text, TouchableOpacity} from "react-native";


const splashScreen = () =>{
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