import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Patient's Name</Text>
                <View style={styles.headerRight}></View> 
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
        
    },
    headerTitle: {
        flex: 1,
        marginLeft:10,
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
    },
    headerRight: {
        width: 0, 
    },
});

export default ChatScreen;