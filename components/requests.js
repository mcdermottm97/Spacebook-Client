/*
This pages acceptRequest and rejectRequest functions are not working. Similar to the login,
they both get a 200 response from the server but the friends list is not updated.
*/

import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, Button, FlatList, ScrollView, StyleSheet,
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
  strip: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
  },
});

class RequestsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestList: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

    this.getRequests();
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

  getRequests = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/friendrequests', {
      method: 'GET',
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
      .then((responseJson) => {
        this.setState({
          requestList: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  acceptRequest = async (id) => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
      method: 'POST',
      headers: {
        'X-Autherization': token,
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
      .then(() => {
        this.getRequests();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  rejectRequest = async (id) => {
    const token = await AsyncStorage.getItem('@session_token');
    return fetch(`http://localhost:3333/api/1.0.0/friendrequests/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Autherization': token,
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
      .then(() => {
        this.getRequests();
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
            Friend requests:
          </Text>
          <FlatList
            data={this.state.requestList}
            renderItem={({ item }) => (
              <View>
                <View>
                  <Text style={styles.bodyText1}>
                    {item.first_name}
                    {' '}
                    {item.last_name}
                  </Text>
                  <Button
                    title="accept"
                    onPress={() => this.acceptRequest(item.user_id)}
                  />
                  <Button
                    title="reject"
                    onPress={() => this.rejectRequest(item.user_id)}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.user_id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

export default RequestsScreen;
