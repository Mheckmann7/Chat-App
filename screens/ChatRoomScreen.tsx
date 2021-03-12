import React from 'react';
import { FlatList, ImageBackground, View } from 'react-native';

import { useRoute } from '@react-navigation/native';
import chatRoomData from '../data/Chats';
import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';

const ChatRoomScreen = () => {

    const route = useRoute();

    return (
        <ImageBackground style={{ width: '100%', height: '100%' }}>
        <FlatList
            data={chatRoomData.messages}
            renderItem={({ item }) => <ChatMessage message={item} />}
            inverted
        />
            <InputBox chatRoomID={route.params.id}/>
        </ImageBackground>
    );
}

export default ChatRoomScreen; 