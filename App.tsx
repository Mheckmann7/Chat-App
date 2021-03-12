import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text } from 'react-native'
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StyleSheet } from 'react-native';
import { withAuthenticator} from 'aws-amplify-react-native';

import {
  Auth,
  API,
  graphqlOperation
} from 'aws-amplify'
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)


function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    let num = Math.floor(Math.random() * Math.floor(100))
    return 'https://picsum.photos/200?random=' + num
 
  }
  function signOut() {
    Auth.signOut()
      .then(() => {
        props.onStateChange('signedOut', null);
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
  // Run only when app is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      // get Authentiated user from auth
      const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true });
      // get the user from backend with the user Id from Auth
      if (userInfo) {
        const userData = await API.graphql(
          graphqlOperation(
          getUser,
          { id: userInfo.attributes.sub}
        ))

        if (userData.data.getUser) {
          console.log("User is already in database");
          return; 
        }
        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey, I am using Chat Real',
        }

        await API.graphql(
          graphqlOperation(
            createUser,
            {input: newUser}
          )
        )
      } 
      // If there is no user in the database with that Id then create one 
    }
    fetchUser(); 
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
        <Text style={styles.container}onPress={signOut}>Sign Out</Text>
      </SafeAreaProvider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'purple'
  },
});


export default withAuthenticator(App)