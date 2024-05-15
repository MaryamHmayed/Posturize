import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userContext';
import { apiInstance } from '../route';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PatientsScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                console.log(`Fetching patients with user token: ${user.token}`);
                const response = await apiInstance.get('/pt/patients', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                    },
                });
                console.log('Fetched patients:', response.data.data);
                setPatients(response.data.data);
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError('Error fetching patients');
            }
        };

        if (user.token) {
            fetchPatients();
        }
    }, [user.token]);


    const saveLastAccessedChat = async (chatRoomId, username) => {
        try {
            await AsyncStorage.setItem('lastChat', JSON.stringify({ chatRoomId, username }));
            console.log('Saved last accessed chat:', { chatRoomId, username }); 
        } catch (error) {
            console.error('Failed to save the last accessed chat', error);
        }
    };

    const generateChatRoomId = (user1Id, user2Id) => {
  
      console.log('Generating chat room ID with:', { user1Id, user2Id });
  
      if (!user1Id || !user2Id) {
          console.error('Missing user IDs:', { user1Id, user2Id });
          return 'defaultRoomId';
      }

      const sortedIds = [user1Id, user2Id].sort();
      return `${sortedIds[0]}_${sortedIds[1]}`;
  };
  
  const navigateToChat = (patient) => {
      if (!user.id) {
          console.error('Current user ID is undefined:', user);
          return;
      }
  
      const chatRoomId = generateChatRoomId(user.id, patient.id);
      console.log('Navigating to chat:', { chatRoomId, recipientName: patient.username });
      saveLastAccessedChat(chatRoomId, patient.username);

      navigation.navigate('Chat', {
          chatRoomId: chatRoomId,
          recipientName: patient.username,
      });
  };

    const renderItem = ({ item }) => (
        <View style={styles.patientItem}>
            <Text style={styles.patientText}>{item.username}</Text>
            <TouchableOpacity onPress={() => navigateToChat(item)}>
                <Text style={styles.chatButton}>Chat</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/arrow-back.png')} style={styles.icon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.header}>Hello {user.username},</Text>
                    <Text style={styles.header}>Find your patients</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('../../assets/alert.png')} />
                </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <FlatList
                data={patients}
                keyExtractor={(item) => item.id?.toString() || 'defaultKey'}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B2B',
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        color: 'white',
        fontSize: 20,
        fontWeight: "500",
        marginRight: 30,
    },
    patientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    patientText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
    chatButton: {
        color: '#FFA500',
        textDecorationLine: "underline",
    },
    headerContainer: {
        marginBottom: 30,
        marginHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icon: {
        marginTop: 7,
    }
});

export default PatientsScreen;