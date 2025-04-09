import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const FeedScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const [favoritedPosts, setFavoritedPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data.slice(0, 20)); // Fetch first 20 posts
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  // Toggle Like
  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Toggle Favorite
  const toggleFavorite = (postId) => {
    setFavoritedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Post Header: Profile Picture + Username */}
              <View style={styles.header}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?img=${item.userId}` }} // Random profile image
                  style={styles.profilePic}
                />
                <Text style={styles.username}>User {item.userId}</Text>
              </View>

              {/* Post Image */}
              <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { post: item })}>
                <Image
                  source={{ uri: `https://picsum.photos/600/400?random=${item.id}` }} // Random post image
                  style={styles.postImage}
                />
              </TouchableOpacity>

              {/* Post Title */}
              <Text style={styles.title}>{item.title}</Text>

              {/* Post Body */}
              <Text style={styles.body}>{item.body.substring(0, 100)}...</Text>

              {/* Action Buttons: Like, Comment, Share, Favorite */}
              <View style={styles.actions}>
                {/* Like Button */}
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Icon
                    name="heart"
                    size={24}
                    color={likedPosts[item.id] ? 'red' : 'gray'}
                  />
                </TouchableOpacity>

                {/* Comment Button */}
                <TouchableOpacity>
                  <Icon name="comment" size={24} color="gray" />
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity>
                  <Icon name="share" size={24} color="gray" />
                </TouchableOpacity>

                {/* Favorite Button */}
                <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                  <Icon
                    name="star"
                    size={24}
                    color={favoritedPosts[item.id] ? 'gold' : 'gray'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default FeedScreen;
