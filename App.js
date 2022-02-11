import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'


const Flex = () => {
  return (
    <View style={styles.container1}>

      <View style={styles.container1}>
        <View style={styles.box1}>
          <Text style={styles.title}>
            Welcome to Spacebook
          </Text>
        </View>
      </View>

      <View style={styles.container2}>
        <View style={styles.box1} >
          <Text>
            Login here
          </Text>
          <TextInput
            style={styles.input}
            placeholder="username"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
          />
          <Button
            title='LOG IN'
          />
        </View>
      </View>

    </View>

    
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    backgroundColor: "black"
  },
  container2: {
    flex: 4,
    padding: 20,
    flexDirection: "row"
  },
  box1: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  box2: {
    flex: 1,
    padding: 5,
    backgroundColor: "darkorange" 
  },
  box3: {
    flex: 1,
    padding: 5,
    backgroundColor: "green" 
  },
  box4: {
    flex: 1,
    backgroundColor: "blue" 
  },
  input: {
    backgroundColor: 'white',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 30
  }

});

export default Flex;
