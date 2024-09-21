/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Login from './components/Login';
import Buddy from './components/Buddy';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BuddyReviewRequest from './components/BuddyReviewRequest';

import Profile from './components/Profile';
import RequestLock from './components/RequestLock';
import BuddyReviewInvite from './components/BuddyReviewInvite';

const Tab = createBottomTabNavigator();
const App = () => {
  const [login, setLogin] = useState(true); // Assuming you toggle this with actual login

  let user = 'user';

  if (!login) {
    return <Login />;
  }

  if (user === 'user') {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Request Lock" component={RequestLock} />
          <Tab.Screen name="Buddy Request" component={Buddy} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else if (user === 'buddy') {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Review Requests" component={BuddyReviewRequest} />
          <Tab.Screen name="Review Invites" component={BuddyReviewInvite} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View>
        <Text>Please create an account or log in.</Text>
      </View>
    );
  }
};

export default App;
