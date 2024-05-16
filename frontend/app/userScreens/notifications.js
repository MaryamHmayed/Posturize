import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useUser } from "../userContext";


const NotificationsScreen = ()=>{
    const {notifications} = useUser();

    const renderItem = ({item}) => (
        <View style = {styles.notificationsContainer}> 
            <Text style = {styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.timestamp}>{new Date (item.data.timestamp).toLocaleString()}</Text>
        
        
        </View>
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
