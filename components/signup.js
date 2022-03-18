import React, { Component } from 'react';
import {
  View, ScrollView, Button, Text, TextInput, StyleSheet,
} from 'react-native';

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

class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    };
  }

  signup = () => {
    return fetch('http://localhost:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } if (response.status === 400) {
          throw 'Failed validation';
        } else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        console.log('User created with ID: ', responseJson);
        this.props.navigation.navigate('login');
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
            placeholder="Enter your first name..."
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Enter your last name..."
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
            style={styles.textInput}
          />
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
            title="Create an account"
            onPress={() => this.signup()}
          />
          <Button
            title="Go back to login"
            onPress={() => this.props.navigation.navigate('login')}
          />
        </View>
      </ScrollView>
    );
  }
}

export default SignupScreen;
