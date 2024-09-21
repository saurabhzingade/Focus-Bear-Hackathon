import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

export default function Buddy() {
  const [buddies, setBuddies] = useState([]);
  const [selectedBuddy, setSelectedBuddy] = useState('');
  const [selectedBuddyId, setSelectedBuddyId] = useState('');

  useEffect(() => {
    const fetchBuddies = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/user/buddys');
        const data = await response.json();
        setBuddies(data);
      } catch (error) {
        console.error('Error fetching buddies:', error);
      }
    };

    fetchBuddies();
  }, []);

  const handleSendRequest = async () => {
    if (selectedBuddyId) {
      const userId = '048de4b7-b3f7-4744-857e-bf5751fea8a9'; // Replace with the correct user_id

      const requestBody = {
        user_id: userId,
        buddy_id: selectedBuddyId,
      };

      try {
        const response = await fetch(
          'http://10.0.2.2:3000/invite/send_invite',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          },
        );

        const responseData = await response.json();

        if (response.ok) {
          Alert.alert(`Friend request sent to ${selectedBuddy}!`);
        } else {
          console.error('Response error:', responseData);
          Alert.alert(
            'Failed to send the friend request:',
            responseData.message || 'Unknown error.',
          );
        }
      } catch (error) {
        console.error('Network error:', error);
        Alert.alert('Error occurred while sending the request:', error.message);
      }
    } else {
      Alert.alert('Please select a buddy first.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select User to Add as Buddy:</Text>

      {buddies.length ? (
        buddies.map(item => (
          <TouchableOpacity
            key={item.user_id}
            style={styles.buddyItem}
            onPress={() => {
              setSelectedBuddy(`${item.firstName} ${item.lastName}`);
              setSelectedBuddyId(item.user_id); // Set the buddy_id
            }}>
            <Text style={styles.buddyText}>
              {item.firstName} {item.lastName}
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noBuddiesText}>No buddies available.</Text>
      )}

      {selectedBuddy ? (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Selected Buddy: {selectedBuddy}
          </Text>
          <Button title="Send Buddy Request" onPress={handleSendRequest} />
        </View>
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
    elevation: 2,
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
  selectedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
