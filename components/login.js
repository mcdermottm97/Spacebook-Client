import React, { Component } from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Welcome to spacebook</Text>
        <TextInput placeholder="email" />
        <TextInput placeholder="password" />
        <Button
          title="log in"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="don't have an account?  sign up here!"
          onPress={() => navigation.navigate('Sign Up')}
        />
      </View>
    );
  }
}

export default LoginScreen;
