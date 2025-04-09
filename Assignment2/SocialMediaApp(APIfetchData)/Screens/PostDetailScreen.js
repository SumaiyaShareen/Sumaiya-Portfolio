import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params; // Receiving post data from navigation

  return (
    <View style={styles.container}>
      {/* Displaying the post image */}
      <Image
        source={{ uri: `https://picsum.photos/600/400?random=${post.id}` }}
        style={styles.postImage}
      />

      {/* Post Title */}
      <Text style={styles.title}>{post.title}</Text>

      {/* Post Body */}
      <Text style={styles.body}>{post.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    color: '#555',
  },
});

export default PostDetailScreen;
