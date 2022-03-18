/*
Something is wrong with this pages logout function, the server gives a 200 response
but there is no navigation to the login page until the user tries to change tab,
then 'checkLoggedIn()' is called and sees the null token.
*/

import React, { Component } from 'react';
import {
  View, Text, Button, ScrollView, StyleSheet,
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

class LogoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    if (token == null) {
      this.props.navigation.navigate('login');
    }
  };

  logOut = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'post',
      headers: {
        'X-Autherization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('login');
        } else if (response.status === 401) {
          this.props.navigation.navigate('login');
        } else {
          throw 'problem';
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.base}>
        <View style={styles.page}>
          <Text style={styles.titleText}>
            Logout here
          </Text>
          <Button
            title="Log Out"
            onPress={() => this.logOut()}
          />
        </View>
      </ScrollView>
    );
  }
}

export default LogoutScreen;
