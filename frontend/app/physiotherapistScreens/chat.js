import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase'; 
import { collection, query, onSnapshot, orderBy, limit, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../userContext';

const ConversationsScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        const chatsRef = collection(db, 'Chats');
        const q = query(chatsRef);

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const conversationsData = await Promise.all(snapshot.docs.map(async (doc) => {
                const chatRoomData = doc.data();

                const messagesRef = collection(db, `Chats/${doc.id}/messages`);
                const latestMsgQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));
                const latestMsgSnapshot = await getDocs(latestMsgQuery);

                let latestMessage = '';
                if (!latestMsgSnapshot.empty) {
                    latestMessage = latestMsgSnapshot.docs[0].data().text || '';
                }

                const recipientId = chatRoomData.participants.find((id) => id !== user.id);
                let recipientName = 'Unknown';
                const recipientDoc = await getDocs(collection(db, 'Users'), recipientId);
                if (!recipientDoc.empty) {
                    recipientName = recipientDoc.data().username || 'Unknown';
                }

                return {
                    id: doc.id,
                    recipientName,
                    latestMessage,
                };
            }));
            setConversations(conversationsData);
        });

        return unsubscribe;
    }, [user.id]);

    const navigateToChat = (conversation) => {
        navigation.navigate('Chat', {
            chatRoomId: conversation.id,
            recipientName: conversation.recipientName,
        });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToChat(item)} style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.recipientName}</Text>
                <Text style={styles.lastMessage}>{item.latestMessage || 'No messages yet'}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={conversations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#2B2B2B',
        borderRadius: 8,
    },
    info: {
        flex: 2,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    lastMessage: {
        fontSize: 14,
        color: 'grey',
    },
});

export default ConversationsScreen;