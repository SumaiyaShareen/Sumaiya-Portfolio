import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('JobList');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const JobListScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonfakery.com/jobs')
   //fetch('http://192.168.86.114:5000/jobs')

      .then(response => response.json())
      .then(data => {
        console.log('Fetched Jobs:', data);
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error('Unexpected API response:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Job Listings</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('JobDetail', { job: item })} style={{ flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1 }}>
            {item.logo && (
              <Image source={{ uri: item.logo }} style={{ width: 50, height: 50, marginRight: 10, borderRadius: 25 }} />
            )}
            <View>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
              <Text>{item.company}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const JobDetailScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{job.title}</Text>
      {job.logo && (
        <Image source={{ uri: job.logo }} style={{ width: 100, height: 100, marginBottom: 10, alignSelf: 'center' }} />
      )}
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Company: {job.company}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Description: {job.description || 'No description available'}</Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>Requirements: {job.requirements || 'No specific requirements'}</Text>
      <Button title="Apply Now" onPress={() => alert('Application link: ' + (job.apply_link || 'Not provided'))} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="JobList" component={JobListScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
