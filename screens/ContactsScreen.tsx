import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from "react";

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View} from '../components/Themed';
import ContactListItem from '../components/ContactListItem';
import { API } from 'aws-amplify'
import { listUsers } from '../src/graphql/queries';

import { FlatList } from 'react-native-gesture-handler';
import { graphqlOperation } from '@aws-amplify/api-graphql';

export default function ContactsScreen() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(
          graphqlOperation(
            listUsers
          )
        )
        setUsers(usersData.data.listUsers.items);
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers();
  },[])


  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={users}
        renderItem={({ item }) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
