import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {View, Text} from 'react-native';

const Tab = createBottomTabNavigator();

const Buddy = () => {
  return (
    <View>
      <Text>THis is where the User can ask a buddy</Text>
    </View>
  );
};

export default Buddy;
