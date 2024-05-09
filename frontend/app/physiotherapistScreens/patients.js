import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../userContext';

const PatientsScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser(); 
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://192.168.1.109:8000/api/pt/patients', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setPatients(response.data.data); 
      } catch (err) {
        setError('Error fetching patients');
      }
    };

    fetchPatients(); 
  }, [user.token]);

  const generateChatRoomId = (user1Id, user2Id) => {
    const sortedUsers = [user1Id, user2Id].sort(); 
    return `${sortedUsers[0]}_${sortedUsers[1]}`;
};

  const navigateToChat = (patient) => {
    const chatRoomId = generateChatRoomId(user.id, patient.id); 
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
        keyExtractor={(item) => item.id.toString()}
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
