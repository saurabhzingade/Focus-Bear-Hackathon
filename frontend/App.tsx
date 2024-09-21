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

const Tab = createBottomTabNavigator();
const App = () => {
  const [login, setLogin] = useState(false); // Assuming you toggle this with actual login

  if (!login) {
    return <Login />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Buddy Request" component={BuddyReviewRequest} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
