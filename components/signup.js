import React, { Component } from 'react';
import {
  Text, View, Button, TextInput,
} from 'react-native';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation } = this.props;

    return (
      <View>
        <Text>Welcome to spacebook</Text>
        <TextInput placeholder="first name" />
        <TextInput placeholder="second name" />
        <TextInput placeholder="email" />
        <TextInput placeholder="password" />
        <Button
          title="sign up"
          onPress={() => navigation.navigate('Log In')}
        />
      </View>
    );
  }
}

export default SignupScreen;
