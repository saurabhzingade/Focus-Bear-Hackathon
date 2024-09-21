import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

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
      <Text style={styles.header}>Select User to Add as Buddy:</Text>

      {buddies.length ? (
        buddies.map(item => (
          <TouchableOpacity
            key={item.user_id}
            style={styles.buddyItem}
            onPress={() =>
              setSelectedBuddy(`${item.firstName} ${item.lastName}`)
            } // Update selected buddy
          >
            <Text style={styles.buddyText}>
              {item.firstName} {item.lastName}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noBuddiesText}>No buddies available.</Text>
      )}

      {selectedBuddy ? (
        <Text style={styles.selectedText}>Selected Buddy: {selectedBuddy}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buddyItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
    elevation: 2, // Adds shadow effect on Android
  },
  buddyText: {
    fontSize: 16,
    color: '#333',
  },
  noBuddiesText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
