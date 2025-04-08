import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PostScreen = () => {
  const [media, setMedia] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setMedia(result.uri);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (media && caption && tags) {
      console.log('Post submitted:', { media, caption, tags });
      // Handle the form submission logic (upload to server, etc.)
    } else {
      alert('Please fill all the fields');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Upload Media Section */}
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
          <Text style={styles.uploadText}>Upload Media</Text>
        </TouchableOpacity>

        {media && <Image source={{ uri: media }} style={styles.mediaPreview} />}
      </View>

      {/* Caption Section */}
      <View style={styles.captionSection}>
        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={styles.input}
          placeholder="Write a caption..."
          multiline
          value={caption}
          onChangeText={setCaption}
          placeholderTextColor="#999"
        />
      </View>

      {/* Tags Section */}
      <View style={styles.tagsSection}>
        <Text style={styles.label}>Tags</Text>
        <TextInput
          style={styles.input}
          placeholder="Add tags (separate by commas)"
          value={tags}
          onChangeText={setTags}
          placeholderTextColor="#999"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',  // Soft, light background color
    padding: 20,
  },
  uploadSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',  // Green color for upload button
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  uploadText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
  mediaPreview: {
    width: '100%',
    height: 250,
    marginTop: 20,
    borderRadius: 20,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  captionSection: {
    marginBottom: 20,
  },
  tagsSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#333',
    height: 100,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PostScreen;
