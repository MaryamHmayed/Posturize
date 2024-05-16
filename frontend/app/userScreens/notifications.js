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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3A3A',
        padding: 10,
    },
    notificationsContainer: {
        backgroundColor: '#1A1A1A',
        padding: 15,
        marginVertical: 10,
        borderRadius: 7,
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        color: 'white',
        fontSize: 14,
        marginVertical: 5,
    },
    timestamp: {
        color: 'gray',
        fontSize: 12,
        textAlign: 'right',
    },
});

export default NotificationsScreen;


