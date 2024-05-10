import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { db } from '../../firebase';
import { useUser } from '../../userContext';
import { collection, addDoc, query, orderBy, onSnapshot, doc } from 'firebase/firestore';


const ROLE_MAP = {
    1: 'physiotherapist',
    2: 'user'
};

const ChatScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
  
    const { chatRoomId = 'defaultRoomId', recipientName = 'Recipient' } = route.params || {};
    const { user: currentUser } = useUser(); 
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);


   
    const currentRole = ROLE_MAP[currentUser?.role_id] || 'unknown';

    useEffect(() => {
        if (!chatRoomId) {
            console.error('Chat Room ID is missing');
            return;
        }

        // Reference to the chat room's document
        const chatRoomRef = doc(db, 'Chats', chatRoomId);
        const messagesRef = collection(chatRoomRef, 'messages');

        // Query for ordering messages by creation time
        const q = query(messagesRef, orderBy('createdAt'));

        // Real-time listener for fetching messages
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(fetchedMessages);
        });

        // Unsubscribe from the listener to prevent memory leaks
        return unsubscribe;
    }, [chatRoomId]);

    const sendMessage = async () => {
        if (inputText.trim()) {
            try {
                // Reference to the messages subcollection
                const chatRoomRef = doc(db, 'Chats', chatRoomId);
                const messagesRef = collection(chatRoomRef, 'messages');

                // Add new message to Firestore
                await addDoc(messagesRef, {
                    text: inputText,
                    sentBy: currentUser?.username || 'unknown',
                    userType: currentRole,
                    createdAt: new Date(),
                });
                setInputText('');
                flatListRef.current?.scrollToEnd({ animated: true });
            } catch (error) {
                console.error('Error sending message:', error);
            }
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
                <Text style={styles.headerTitle}>{recipientName}</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={(item) => item.id}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
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
});

export default ChatScreen;
