import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { User } from '../../types';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';

 
export type ContactListItemProps = {
    user: User
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;
    const navigation = useNavigation();
    
    const onClick = async () => {
        try {
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: {}
                    }
                )
            )

            if (!newChatRoomData.data) {
                console.log("Failed to create")
                return 
            }
            const newChatRoom = newChatRoomData.data.createChatRoom;
            console.log(newChatRoom);
                await API.graphql(
                    graphqlOperation(
                        createChatRoomUser, {
                            input: {
                                userID: user.id,
                                chatRoomID: newChatRoom.id
                            }
                        }
                    )
                )
            const userInfo = await Auth.currentAuthenticatedUser(); 
                await API.graphql(
                    graphqlOperation(
                        createChatRoomUser, {
                            input: {
                                userID: userInfo.attributes.sub,
                                chatRoomID: newChatRoom.id
                                
                            }
                        }
                    )
                )
            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "name",
            })

        } catch (error) {
            console.log(error)
        }
    }

 

    return (
        <TouchableWithoutFeedback onPress={onClick}>
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />
     
                <View style={styles.midContainer}> 
                    <Text style={styles.userName}>{user.name}</Text>
                </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ContactListItem;