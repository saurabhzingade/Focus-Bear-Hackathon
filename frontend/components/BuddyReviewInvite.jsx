import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const BuddyReviewInvite = () => {
  const buddy_id = 'a807b774-87dc-443a-aef3-15cc3eb91dbc';
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:3000/invite/recieved_invites?user_id=${buddy_id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInvites(data); // Assuming the response is an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, [buddy_id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Following users have sent a request for you to be their buddy:
      </Text>
      {invites.length > 0 ? (
        invites.map(invite => (
          <View key={invite.invite_id} style={styles.inviteItem}>
            <Text style={styles.username}>{invite.buddy.username}</Text>
            <Text>
              {invite.buddy.firstName} {invite.buddy.lastName}
            </Text>
            <Text>Email: {invite.buddy.email}</Text>
            <Text>
              Created Time: {new Date(invite.created_time).toLocaleString()}
            </Text>
          </View>
        ))
      ) : (
        <Text>No invites found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inviteItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
  },
});

export default BuddyReviewInvite;
