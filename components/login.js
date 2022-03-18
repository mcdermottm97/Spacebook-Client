import React, { Component } from 'react';
import {
  View, ScrollView, Button, Text, TextInput, StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',

  },
  headerText1: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  headerText2: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
  textInput: {
    borderRadius: 6,
    padding: 5,
    borderWidth: 1,
    margin: 5,
  },
  bodyText1: {
    fontSize: 15,
    padding: 10,
  },
  bodyText2: {
    fontSize: 10,
    padding: 10,
  },
  base: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    backgroundColor: 'rgb(0,15,35)',
  },
  page: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  login = async () => {
    return fetch('http://localhost:3333/api/1.0.0/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        await AsyncStorage.setItem('@session_token', responseJson.token);
        await AsyncStorage.setItem('@user_id', responseJson.id);
        this.props.navigation.navigate('account');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.base}>
        <View style={styles.page}>
          <Text style={styles.headerText2}>
            Enter your details here:
          </Text>
          <TextInput
            placeholder="Enter your email..."
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Enter your password..."
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
            style={styles.textInput}
          />
          <Button
            title="Login"
            onPress={() => this.login()}
          />
          <Button
            title="Don't have an account?"
            onPress={() => this.props.navigation.navigate('signup')}
          />
        </View>
      </ScrollView>
    );
  }
}

export default LoginScreen;
