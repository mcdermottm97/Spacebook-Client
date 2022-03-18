import 'react-native-gesture-handler';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text, View, StyleSheet, ScrollView, FlatList,
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
  strip: {},
});

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      friendList: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

    this.getProfile();
    this.getFriends();
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

  getProfile = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}`, {
      method: 'get',
      headers: {
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } if (response.status === 401) {
          this.props.navigation.navigate('login');
        }
      })
      .then((responseJson) => {
        this.setState({
          id,
          first_name: responseJson.first_name,
          last_name: responseJson.last_name,
          email: responseJson.email,

        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getFriends = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    const id = await AsyncStorage.getItem('@user_id');
    return fetch(`http://localhost:3333/api/1.0.0/user/${id}/friends`, {
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
        }
      })
      .then((responseJson) => {
        this.setState({
          friendList: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView style={styles.base}>
        <View style={styles.page}>
          <View>
            <View>
              <Text style={styles.titleText}>
                {this.state.first_name}
                {' '}
                {this.state.last_name}
              </Text>
              <Text style={styles.headerText2}>
                {this.state.email}
              </Text>
              <Text style={styles.bodyText1}>
                {'account id: '}
                {this.state.id}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.headerText2}>
              Your Friends:
            </Text>
            <FlatList
              data={this.state.friendList}
              renderItem={({ item }) => (
                <View>
                  <View>
                    <Text style={styles.bodyText1}>
                      {item.user_givenname}
                      {' '}
                      {item.user_familyname}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ProfileScreen;
