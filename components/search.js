/*
I ran out of time to impliment proper search functionality but
I was able to list all other users with the ability to send
each one a friend request
*/

import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, Button, FlatList, StyleSheet, ScrollView,
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

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

    this.getUsers();
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

  getUsers = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/search', {
      method: 'GET',
      headers: {
        'X-Authorization': value,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate('login');
        } else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        this.setState({
          listData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  sendRequest = async (id) => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
      method: 'POST',
      headers: {
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate('login');
        } else {
          throw 'Something went wrong';
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
          <Text style={styles.headerText1}>
            Other Users:
          </Text>
          <FlatList
            data={this.state.listData}
            renderItem={({ item }) => (
              <View>
                <View>
                  <Text style={styles.bodyText1}>
                    { item.user_givenname }
                    {' '}
                    { item.user_familyname }
                    {' : '}
                    { item.user_id }
                  </Text>
                </View>
                <Button
                  title="send request"
                  onPress={() => this.sendRequest(item.user_id)}
                />
              </View>
            )}
            keyExtractor={(item) => item.user_id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

export default HomeScreen;
