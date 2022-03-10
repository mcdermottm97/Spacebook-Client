import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, FlatList, StyleSheet, Button, ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  base: {
    flex: 1,
    padding: 30,
    backgroundColor: 'rgb(0,15,35)',
    flexDirection: 'column',
  },
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  stripContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    borderWidth: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  textInput: {
    height: 40,
    textAlign: 'center',
    margin: 6,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      listData: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener('focus', () => {
      this.checkLoggedIn();
    });

    this.getData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = async () => {
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
          this.props.navigation.navigate('Login');
        } else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          listData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if (value !== null) {
      this.setState({ token: value });
    } else {
      this.props.navigation.navigate('login');
    }
  };

  logout = async () => {
    const token = await AsyncStorage.getItem('@session_token');
    await AsyncStorage.removeItem('@session_token');
    return fetch('http://localhost:3333/api/1.0.0/logout', {
      method: 'post',
      headers: {
        'X-Authorization': token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate('login');
        } else if (response.status === 401) {
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
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Loading..</Text>
        </View>
      );
    }
    return (
      <ScrollView style={styles.base}>
        <View style={styles.pageContainer}>
          <View style={styles.bodyContainer}>
            <Text>yourname</Text>
          </View>
          <View style={styles.bodyContainer}>
            <FlatList
              data={this.state.listData}
              renderItem={({ item }) => (
                <View>
                  <View>
                    <Text>
                      {item.user_givenname}
                      { item.user_familyname }
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.user_id.toString()}
            />
          </View>
        </View>
        <Button
          title="OK, take me home"
          onPress={() => this.logout()}
        />
      </ScrollView>
    );
  }
}

export default HomeScreen;

