
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatScreen = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello', sent: true },
        { id: '2', text: 'Hello!', sent: false }
    ]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMessage = {
                id: String(messages.length + 1),
                text: inputText,
                sent: true
            };
            setMessages([...messages, newMessage]);
            setInputText('');
        }
    };

    const renderMessageItem = ({ item }) => (
        <View style={[styles.messageContainer, item.sent ? styles.sentMessage : styles.receivedMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessageItem}
                keyExtractor={item => item.id}
                inverted
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
                    <Icon name="send"  />
                </TouchableOpacity>
            </View>
        </View>
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
        backgroundColor: '#333',
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#444',
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
    }
});

export default ChatScreen;