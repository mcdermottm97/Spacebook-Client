/*
Matthew McDermott - 18/03/2022

For this project I used ESLint to enforce AirBnB style.
In some areas I was unable to follow the style, for
each case I have disabled the rule in the '.eslintrc.js'
file.
*/

import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './components/login';
import SignupScreen from './components/signup';
import AccountNavigation from './components/account';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="signup" component={SignupScreen} />
          <Stack.Screen
            name="account"
            component={AccountNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
