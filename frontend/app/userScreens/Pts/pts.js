import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../userContext';

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
                const response = await axios.get('http://192.168.1.109:8000/api/PTs', {
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

    // Generates a chat room ID using both the user and physiotherapist IDs
    const generateChatRoomId = (currentUserId, physioId) => {
        return `${currentUserId}_${physioId}`;
    };

    const navigateToChat = (physio) => {
        const chatRoomId = generateChatRoomId(user.id, physio.id);
        navigation.navigate('Chat', { 
            chatRoomId: chatRoomId, 
            recipientName: physio.username 
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
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
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
        padding: 5,
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        paddingHorizontal: 10,
        fontWeight: '500',
    },
    chatText: {
        color: '#fff',
        padding: 5,
        textDecorationLine: 'underline',
        fontWeight: '300',
    },
});

export default PhysiotherapistsScreen;

