import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// Mock Data for Featured Jobs
const featuredJobs = [
  { id: '1', company: 'Tech Corp', title: 'Software Engineer', location: 'Remote', type: 'Full-Time', salary: '$80k - $100k', logo: 'https://via.placeholder.com/50' },
  { id: '2', company: 'Design Co', title: 'UI/UX Designer', location: 'New York', type: 'Part-Time', salary: '$50k - $70k', logo: 'https://via.placeholder.com/50' },
];

// Mock Data for Recent Jobs
const recentJobs = [
  {
    id: '1',
    company: 'Google',
    title: 'Senior Software Engineer',
    location: 'Mountain View, CA',
    type: 'Full-Time',
    salary: '$120k - $150k',
    logo: 'https://via.placeholder.com/50',
    date: '2 days ago',
  },
  {
    id: '2',
    company: 'Facebook',
    title: 'Product Manager',
    location: 'Menlo Park, CA',
    type: 'Full-Time',
    salary: '$130k - $160k',
    logo: 'https://via.placeholder.com/50',
    date: '3 days ago',
  },
  {
    id: '3',
    company: 'Amazon',
    title: 'Data Scientist',
    location: 'Seattle, WA',
    type: 'Full-Time',
    salary: '$110k - $140k',
    logo: 'https://via.placeholder.com/50',
    date: '5 days ago',
  },
  {
    id: '4',
    company: 'Microsoft',
    title: 'Cloud Engineer',
    location: 'Redmond, WA',
    type: 'Full-Time',
    salary: '$115k - $145k',
    logo: 'https://via.placeholder.com/50',
    date: '1 week ago',
  },
  {
    id: '5',
    company: 'Apple',
    title: 'iOS Developer',
    location: 'Cupertino, CA',
    type: 'Full-Time',
    salary: '$125k - $155k',
    logo: 'https://via.placeholder.com/50',
    date: '1 week ago',
  },
];

const categories = ['All Jobs', 'Remote', 'Full-Time', 'Part-Time', 'Internships', 'Freelance'];

// Home Screen Component
function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [savedJobs, setSavedJobs] = useState([]); // State for saved jobs
  const [loading, setLoading] = useState(false); // State for loading indicator (set to false since we're using mock data)
  const [selectedCategory, setSelectedCategory] = useState('All Jobs'); // State for selected category

  // Function to filter jobs based on search query and selected category
  const filterJobs = (jobs, query, category) => {
    let filteredJobs = jobs;

    // Filter by search query
    if (query) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) || // Search by title
          job.company.toLowerCase().includes(query.toLowerCase()) || // Search by company
          job.location.toLowerCase().includes(query.toLowerCase()) // Search by location
      );
    }

    // Filter by selected category
    if (category !== 'All Jobs') {
      filteredJobs = filteredJobs.filter((job) => job.type === category);
    }

    return filteredJobs;
  };

  // Function to handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category
  };

  // Function to handle bookmark click
  const handleBookmarkClick = (job) => {
    if (savedJobs.includes(job.id)) {
      setSavedJobs(savedJobs.filter((id) => id !== job.id)); // Remove job if already saved
      Alert.alert('Job Removed', `${job.title} removed from saved jobs`);
    } else {
      setSavedJobs([...savedJobs, job.id]); // Add job to saved jobs
      Alert.alert('Job Saved', `${job.title} added to saved jobs`);
    }
  };

  // Function to handle Apply Now click
  const handleApplyNowClick = (job) => {
    Alert.alert('Apply Now', `You applied for: ${job.title}`);
  };

  // Filtered jobs
  const filteredFeaturedJobs = filterJobs(featuredJobs, searchQuery, selectedCategory);
  const filteredRecentJobs = filterJobs(recentJobs, searchQuery, selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <Text style={styles.appName}>JobFinder</Text>
        <View style={styles.icons}>
          <Ionicons name="search" size={24} color="#333" />
          <Ionicons name="notifications" size={24} color="#333" style={{ marginLeft: 20 }} />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs, companies, or keywords"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Update search query
        />
        <Ionicons name="filter" size={20} color="#666" />
      </View>

      {/* Categories Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.category,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryClick(category)} // Handle category click
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Jobs */}
      <Text style={styles.sectionTitle}>Featured Jobs</Text>
      <FlatList
        data={filteredFeaturedJobs}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.details}>{item.location} • {item.type}</Text>
            <Text style={styles.salary}>{item.salary}</Text>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => handleApplyNowClick(item)} // Handle Apply Now click
            >
              <Text style={styles.applyText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Recent Jobs */}
      <Text style={styles.sectionTitle}>Recent Jobs</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredRecentJobs}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.recentJobCard}>
              <Image source={{ uri: item.logo }} style={styles.logo} />
              <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.details}>{item.location} • {item.type}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <TouchableOpacity onPress={() => handleBookmarkClick(item)}>
                <Ionicons
                  name={savedJobs.includes(item.id) ? 'bookmark' : 'bookmark-outline'}
                  size={24}
                  color="#007bff"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light blue background
    padding: 16,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff', // Blue text
  },
  icons: {
    flexDirection: 'row',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  categories: {
    marginBottom: 20,
  },
  category: {
    backgroundColor: '#fff', // White background
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#007bff', // Blue background for selected category
  },
  categoryText: {
    color: '#333', // Dark text
  },
  selectedCategoryText: {
    color: '#fff', // White text for selected category
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff', // Blue text
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    width: 200,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recentJobCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#666',
  },
  salary: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  applyButton: {
    backgroundColor: '#007bff', // Blue button
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  jobDetails: {
    flex: 1,
    marginLeft: 10,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  loader: {
    marginTop: 20,
  },
});

export default HomeScreen;