import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecentChatsScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const loadLastAccessedChat = async () => {
            try {
                console.log('Attempting to load last accessed chat...');
                const lastChatData = await AsyncStorage.getItem('lastChat');
                console.log('Last Chat Data:', lastChatData);
                if (lastChatData !== null) {
                    const { chatRoomId, username } = JSON.parse(lastChatData);
                    console.log('Loaded last accessed chat:', { chatRoomId, username });
                    navigation.navigate('Chat', {
                        chatRoomId: chatRoomId,
                        recipientName: username,
                    });
                } else {
                    console.log('No recent chats found');
                }
            } catch (error) {
                console.error('Failed to load the last accessed chat', error);
            }
        };
    
        loadLastAccessedChat();
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading your most recent chat...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D3D3D3' 
    }
});

export default RecentChatsScreen;