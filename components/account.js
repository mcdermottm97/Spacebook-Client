import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileScreen from './profile';
import RequestsScreen from './requests';
import SearchScreen from './search';
import LogoutScreen from './logout';

const Tab = createBottomTabNavigator();

class AccountNavigation extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="profile" component={ProfileScreen} />
        <Tab.Screen name="requests" component={RequestsScreen} />
        <Tab.Screen name="search" component={SearchScreen} />
        <Tab.Screen name="logout" component={LogoutScreen} />
      </Tab.Navigator>
    );
  }
}

export default AccountNavigation;
