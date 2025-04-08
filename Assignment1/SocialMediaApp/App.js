import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import AuthScreen from './screens/AuthScreen';  // Login & Signup
import FeedScreen from './screens/FeedScreen';  // Feed
import CreatePostScreen from './screens/CreatePostScreen';  // Create Post
import ProfileScreen from './screens/ProfileScreen';  // Profile
import ChatScreen from './screens/ChatScreen';  // Chat
import NotificationsScreen from './screens/NotificationsScreen';  // Notifications

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        {/* Authentication Screen (Login & Signup) */}
        <Stack.Screen name="Auth" component={AuthScreen} />

        {/* Feed Tab Navigator */}
        <Stack.Screen name="FeedTab" component={FeedTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
