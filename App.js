import React, { Componenet } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native-web';

export default function App() {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          Welcome to Spacebook
        </Text>
        
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.heading}>
          Login
        </Text>
        <TextInput style={styles.textInput} placeholder="username"/>
        <TextInput style={styles.textInput} placeholder="password"/>
        <Button title="Login"/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    padding: 30,
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  headerContainer: {
    height: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    borderRadius: 10,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,

  },
  heading:{
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20
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
