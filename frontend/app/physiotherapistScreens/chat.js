import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useUser } from '../userContext';
import { db } from '../firebase';

const ConversationsScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        console.log(`Fetching conversations for user ID: ${user.id}`);

        const chatQuery = query(
            collection(db, 'Chats'),
            where('participants', 'array-contains', user.id)
        );
        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) => {
            console.log(`Query snapshot size: ${querySnapshot.size}`);
            const fetchedConversations = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                console.log(`Fetched chat room ID: ${doc.id}, Data: `, data);
                return {
                    id: doc.id,
                    participants: data.participants.join(', '),
                };
            });
            setConversations(fetchedConversations);
        });
        return unsubscribe;
    }, [user.id]);

    const navigateToChat = (chatRoomId) => {
        navigation.navigate('Chat', { chatRoomId });
    };

    const renderConversationItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigateToChat(item.id)}>
            <View style={styles.conversationItem}>
                <Text style={styles.participants}>{item.participants}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id}
                renderItem={renderConversationItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2B2B2B',
        padding: 20,
    },
    conversationItem: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
    },
    participants: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConversationsScreen;
