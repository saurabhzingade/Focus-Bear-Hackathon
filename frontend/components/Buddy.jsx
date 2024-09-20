import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BuddyReviewRequest from './BuddyReviewRequest';
import Profile from './Profile';
import {View, Text} from 'react-native';

const Tab = createBottomTabNavigator();

const Buddy = () => {
  return (
    <View>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Profile} />
          <Tab.Screen name="Settings" component={BuddyReviewRequest} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Buddy;
