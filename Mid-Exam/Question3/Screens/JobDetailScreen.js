import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Job Detail Screen Component
function JobDetailScreen({ route, navigation }) {
  const { job } = route.params; // Get job data from navigation params

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#007bff" />
      </TouchableOpacity>

      {/* Job Header */}
      <View style={styles.jobHeader}>
        <Image source={{ uri: job.logo }} style={styles.companyLogo} />
        <Text style={styles.jobTitle}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <Text style={styles.location}>{job.location}</Text>
        <Text style={styles.date}>{job.date}</Text>
      </View>

      {/* Job Description */}
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Job Description</Text>
        <Text style={styles.descriptionText}>
          We are looking for a talented {job.title} to join our team. You will be responsible for creating amazing user experiences and designing intuitive interfaces.
        </Text>
      </View>

      {/* Job Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        <Text style={styles.requirementText}>• Bachelor’s degree in Design or related field.</Text>
        <Text style={styles.requirementText}>• 2+ years of experience in UI/UX design.</Text>
        <Text style={styles.requirementText}>• Proficiency in Figma or Sketch.</Text>
        <Text style={styles.requirementText}>• Experience with user research is a plus.</Text>
      </View>

      {/* Apply Now Button */}
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  jobHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  company: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff', // Blue text
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  requirementsSection: {
    marginBottom: 20,
  },
  requirementText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 24,
  },
  applyButton: {
    backgroundColor: '#007bff', // Blue button
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default JobDetailScreen;