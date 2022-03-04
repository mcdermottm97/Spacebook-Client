/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // lint found problem resolving path to module, disabled for this file

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import SignupScreen from './components/signup';

const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Log In">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Log In" component={LoginScreen} />
          <Stack.Screen name="Sign Up" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
