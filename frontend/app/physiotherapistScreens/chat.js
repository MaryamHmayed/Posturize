import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase';
import { useUser } from '../userContext';
import { collection, addDoc,getDocs, query, orderBy ,onSnapshot, doc } from 'firebase/firestore';



const ROLE_MAP = {
    1: 'physiotherapist',
    2: 'user'
  };

  console.log('Firestore Instance:', db);

  const testFirestoreConnection = async () => {
    try {
      const chatsRef = collection(db, 'Chats');
      const snapshot = await getDocs(chatsRef);
      console.log('Test Connection:', snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error('Firestore Connection Error:', error);
    }
  };
  
  testFirestoreConnection();

  
const ChatScreen = ({ chatRoomId = 'defaultRoomId' }) => {
  const navigation = useNavigation();
  const { user: currentUser } = useUser(); 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const currentRole = ROLE_MAP[currentUser?.role_id] || 'unknown';

  console.log('Chat Room ID:', chatRoomId);

  // db.collection('Chats').get()
  // .then(snapshot => {
  //   console.log('Test connection:', snapshot.docs.map(doc => doc.data()));
  // })
  // .catch(error => console.error('Firestore connection error:', error));

  useEffect(() => {
    if (!chatRoomId) {
      console.error('Chat Room ID is missing');
      return;
    }

    const chatRoomRef = doc(db, 'Chats', chatRoomId);
    const messagesRef = collection(chatRoomRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const fetchedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched Messages:', fetchedMessages);
      setMessages(fetchedMessages);
    });

    return unsubscribe;
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (inputText.trim()) {
      const chatRoomRef = doc(db, 'Chats', chatRoomId);
      const messagesRef = collection(chatRoomRef, 'messages');
      await addDoc(messagesRef, {
        text: inputText,
        sentBy: currentUser?.username || 'unknown',
        userType: currentRole,
        createdAt: new Date()
      });
      
      setInputText('');
    }
  };

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageContainer, item.sentBy === currentUser?.username ? styles.sentMessage : styles.receivedMessage]}>
      <Text style={styles.messageText}>{item.text || 'No message text'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentRole === 'physiotherapist' ? "Patient's Name" : "Physiotherapist's Name"}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={28} color="#FFA500" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2B2B2B',
    },
    messageContainer: {
      padding: 10,
      margin: 10,
      borderRadius: 7,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#1A1A1A',
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#1A1A1A',
    },
    messageText: {
      color: 'white',
      fontSize: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      backgroundColor: '#1A1A1A',
    },
    input: {
      flex: 1,
      height: 40,
      backgroundColor: '#333',
      color: 'white',
      borderRadius: 7,
      paddingHorizontal: 15,
      marginRight: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      paddingTop: 30,
    },
    headerTitle: {
      flex: 1,
      marginLeft: 10,
      color: 'white',
      fontSize: 18,
      fontWeight: '400',
    },
    headerRight: {
      width: 0,
    },
  });
  
  export default ChatScreen;