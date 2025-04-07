import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for messages
const messages = [
  {
    id: '1',
    sender: 'John Doe',
    message: 'Hey, are you available for an interview?',
    time: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    sender: 'Jane Smith',
    message: 'We would like to offer you the position!',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: '3',
    sender: 'Tech Corp',
    message: 'Your application has been reviewed.',
    time: '2 days ago',
    unread: true,
  },
];

const MessagesScreen = ({ navigation }) => {
  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageCard}
      onPress={() => navigation.navigate('Chat', { message: item })}
    >
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <Text style={styles.messageText} numberOfLines={1} ellipsizeMode="tail">
        {item.message}
      </Text>
      {item.unread && <View style={styles.unreadBadge} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  list: {
    padding: 16,
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    marginRight: 20, // Space for unread badge
  },
  unreadBadge: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});

export default MessagesScreen;