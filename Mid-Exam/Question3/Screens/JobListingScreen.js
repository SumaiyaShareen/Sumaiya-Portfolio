import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// Job Listing Screen Component
function JobListingScreen({ navigation }) {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false); // State to toggle favorites filter
  const [favorites, setFavorites] = useState([]); // State to track favorite jobs
  const [jobs, setJobs] = useState([]); // State to store fetched jobs
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch job data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://jsonfakery.com/jobs'); // Replace with your API endpoint
        setJobs(response.data); // Update state with fetched jobs
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false); // Hide loading indicator
      }
    };

    fetchJobs();
  }, []);

  // Function to toggle a job as favorite
  const toggleFavorite = (jobId) => {
    if (favorites.includes(jobId)) {
      setFavorites(favorites.filter((id) => id !== jobId)); // Remove from favorites
    } else {
      setFavorites([...favorites, jobId]); // Add to favorites
    }
  };

  // Filter jobs based on favorites toggle
  const filteredJobs = showFavoritesOnly
    ? jobs.filter((job) => favorites.includes(job.id)) // Show only favorites
    : jobs; // Show all jobs

  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        {/* Arrow Button and App Name */}
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.appName}>JobFinder</Text>
        </View>

        {/* Profile Logo on the Right */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'data:image/jpeg;base64,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' }} // Replace with your profile logo URL
            style={styles.profileLogo}
          />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons (All and Favorites) */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, !showFavoritesOnly && styles.activeFilter]}
          onPress={() => setShowFavoritesOnly(false)}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, showFavoritesOnly && styles.activeFilter]}
          onPress={() => setShowFavoritesOnly(true)}
        >
          <Text style={styles.filterText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Job List */}
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobCard}
              onPress={() => navigation.navigate('JobDetail', { job: item })} // Navigate to JobDetail with job data
            >
              <Image source={{ uri: item.logo }} style={styles.jobLogo} />
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Ionicons
                  name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={favorites.includes(item.id) ? '#ff4757' : '#333'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
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
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 10,
  },
  profileLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobLogo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 16,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  company: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  loader: {
    marginTop: 20,
  },
});

export default JobListingScreen;