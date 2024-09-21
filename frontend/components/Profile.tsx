import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'A passionate software developer and tech enthusiast.',
    profilePicture: 'https://example.com/path/to/profile-pic.jpg', // Replace with a valid URL
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: user.profilePicture}}
        style={styles.profilePicture}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    color: '#777',
  },
});

export default Profile;
