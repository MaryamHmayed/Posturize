import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../userContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';  
import { apiInstance } from '../../route';

const PhysiotherapistsScreen = () => {
    const navigation = useNavigation();
    const [physiotherapists, setPhysiotherapists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useUser();

    useEffect(() => {
        const fetchPhysiotherapists = async () => {
            setLoading(true);
            try {
                if (!user.token) {
                    console.error('No token found!');
                    return;
                }
                const response = await apiInstance.get('/PTs', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });

                setPhysiotherapists(response.data.data);
            } catch (error) {
                console.error('Error fetching physiotherapists:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhysiotherapists();
    }, [user.token]);


    const generateChatRoomId = (user1Id, user2Id) => {
        const sortedIds = [user1Id, user2Id].sort();
        return `${sortedIds[0]}_${sortedIds[1]}`;
    };

    const navigateToChat = (physio) => {
        const chatRoomId = generateChatRoomId(user.id, physio.id);
        console.log('Navigating to chat:', { chatRoomId, recipientName: physio.username });
    
        navigation.navigate('Chat', {
            chatRoomId: chatRoomId,
            recipientName: physio.username,
        });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image 
                source={item.profile_image ? { uri: `http://192.168.1.109:8000/storage/${item.profile_image}` } : require('../../../assets/logolarge.png')} 
                style={styles.image} 
            />
            <View style={styles.info}>
                <Text style={styles.name}>{item.username}</Text>
                <Text style={styles.detail}>{item.location || 'Location not specified'}</Text>
                <Text style={styles.detail}>{item.bio || 'No bio available'}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Request</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToChat(item)}>
                        <Text style={styles.chatText}>Chat</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    const filteredPhysiotherapists = physiotherapists.filter((physio) => 
        physio.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.container}>
             <View style={styles.searchContainer}>
             <TouchableOpacity>
                    <Icon name="magnify" size={24} paddingHorizontal={4} color="grey" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#FFA500" />
            ) : (
                <FlatList
                    data={filteredPhysiotherapists}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3D3A3A',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 3,
        margin: 10,
    },
    
    card: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: '#2B2B2B',
        borderRadius: 10,
        marginHorizontal: 12,
        height:130
    },
    image: {
        width: "40%",
        height: "100%",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius:10,
        marginRight: 15,
    },
    info: {
        flex: 2,
        justifyContent: 'center',
        gap: 6,
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
        paddingHorizontal: 7,
        paddingVertical:5,
        borderRadius: 3,
        alignItems:"center",
        
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        alignSelf: "center",
        paddingHorizontal:0
        
    },
    chatText: {
        color: '#fff',
        padding: 5,
        textDecorationLine: 'underline',
        fontWeight: '300',
        marginRight:5
    },
});

export default PhysiotherapistsScreen;

