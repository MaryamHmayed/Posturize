import React from 'react';
import { ScrollView, View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const PhysiotherapistsScreen = () => {
    const physiotherapists = [
        {
            id: '1',
            name: 'Physiotherapist’s name',
            location: 'Location',
            bio: 'Bio',
            image: require('../../../assets/logolarge.png'),
        },
        {
            id: '2',
            name: 'Physiotherapist’s name',
            location: 'Location',
            bio: 'Bio',
            image: require('../../../assets/logolarge.png'),
        },
        {
            id: '3',
            name: 'Physiotherapist’s name',
            location: 'Location',
            bio: 'Bio',
            image: require('../../../assets/logolarge.png'),
        },
        
    ];

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>{item.location}</Text>
                <Text style={styles.detail}>{item.bio}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.chatText}>Chat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <TextInput 
                style={styles.searchBar} 
                placeholder="  Search..." 
            />
            <FlatList
                data={physiotherapists}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3A3A',
        paddingTop:70,
        paddingHorizontal:20
    },
    searchBar: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 3,
        margin: 10,
        fontSize: 14,
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        marginVertical: 5,
        backgroundColor: '#2B2B2B',
        borderRadius: 10,
        marginHorizontal: 10,
        
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
    },
    info: {
        flex: 2,
        justifyContent: 'center',
        gap:6
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    detail: {
        fontSize: 14,
        color: 'grey',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#FFA500',
        padding: 5,
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        paddingHorizontal: 10,
        fontWeight:"500"
    },
    chatText:{
        color:"#fff",
        padding:5,
        textDecorationLine:"underline",
        fontWeight:"300"

    }
});

export default PhysiotherapistsScreen;

