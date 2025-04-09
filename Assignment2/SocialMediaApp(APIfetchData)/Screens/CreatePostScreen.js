import React, { useState } from 'react';
import {
  View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const CreatePostScreen = () => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);

  // Image Picker Function
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPostImage(result.assets[0].uri);
    }
  };

  // Post Submission Function
  const handlePost = () => {
    if (!postText && !postImage) {
      Alert.alert("Empty Post", "Write something or add an image!");
      return;
    }
    Alert.alert("Posted Successfully", "Your post has been shared!");
    setPostText('');
    setPostImage(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* User Profile Image */}
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmole3Nyf869aGKeSZEt47dq6_7V1-UdVQQ&s' }} // Replace with dynamic user image
          style={styles.profileImage}
        />

        {/* User Name & Follow Button */}
        <Text style={styles.userName}>John Doe</Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>

        {/* Post Button */}
        <TouchableOpacity onPress={handlePost} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Text Input for Post */}
      <TextInput
        style={styles.textInput}
        placeholder="What's on your mind?"
        placeholderTextColor="#555"
        multiline
        value={postText}
        onChangeText={setPostText}
      />

      {/* Selected Image */}
      {postImage && <Image source={{ uri: postImage }} style={styles.postImage} />}

      {/* Image Picker Button */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>📷 Add Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8EA', // Light green background
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  followButton: {
    backgroundColor: '#4CAF50', // Green Follow Button
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#388E3C', // Darker green
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    height: 150,
    fontSize: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  postImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  imagePickerButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  imagePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
