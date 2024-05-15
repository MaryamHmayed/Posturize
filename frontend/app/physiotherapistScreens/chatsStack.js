import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../userScreens/Pts/chat';
import RecentChatsScreen from './chat';

const Stack = createNativeStackNavigator();

const ChatsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chats" component={RecentChatsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default ChatsStack;