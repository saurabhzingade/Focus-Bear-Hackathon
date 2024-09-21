import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import RNPickerSelect from 'react-native-picker-select';

export default function Buddy() {
  const [buddies, setBuddies] = useState([]);
  const [selectedBuddy, setSelectedBuddy] = useState('');

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/user/buddys');
        const data = await response.json();
        setBuddies(data); // Assuming data is an array of buddy objects
      } catch (error) {
        console.error('Error fetching buddies:', error);
      }
    };

    fetchBuddies();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Select User to adda as buddy:</Text>

      {buddies.length
        ? buddies.map(item => (
            <View>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
            </View>
          ))
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  picker: {
    height: 50,
    width: 250,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});
