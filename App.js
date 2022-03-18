/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import 'react-native-gesture-handler';
import * as React from 'react';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // lint found problem resolving path to module, disabled for this file

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import SignupScreen from './components/signup';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

