import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput, Text} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';


const InputBox = () => {

    const [message, setMessage] = useState('');
    
    const onPress = () => {
        setMessage('')
        console.log('Sent')
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TextInput
                    placeholder={"Type a message"}
                    style={styles.textMessage}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
            </View>
            <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <MaterialIcons name="send" size={28} color="white"/>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default InputBox;