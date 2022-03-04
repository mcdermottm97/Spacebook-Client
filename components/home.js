import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
        <Button />
      </View>
    );
  }
}

export default HomeScreen;
