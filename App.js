import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { getAuth, onAuthStateChanged } from "firebase/auth";

import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MenuScreen from './src/screens/MenuScreen';
import PlaceDetailsScreen from './src/screens/PlaceDetailsScreen';
import MapScreen from './src/screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      onAuthStateChanged(getAuth(), user => {
        if (user) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      })
    }, []);

  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Sign Up'>
            {isSignedIn ? (
              <>
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Menu" component={MenuScreen} />
              <Stack.Screen name="Place Details" component={PlaceDetailsScreen} /> 
              <Stack.Screen name="Map" component={MapScreen} /> 
            </>) : (<>
              <Stack.Screen name="Sign Up" component={SignUpScreen} />
              <Stack.Screen name="Sign In" component={SignInScreen} />
            </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
