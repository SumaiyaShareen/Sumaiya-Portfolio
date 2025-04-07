import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for background effect

const ProfileSettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Sumaiya",
    email: "summi@gmail.com",
    profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Up3ugBAa9HqTYHNpPhzNUjEMesYsIIDL-Q&s", // Add your profile picture URL here
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={isDarkMode ? ['#1f1f1f', '#444'] : ['#ffffff', '#6ec6ff']} // Gradient background for light/dark mode
        style={styles.gradientBackground}
      >
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={[styles.profileBackground, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
            <Image source={{ uri: userInfo.profilePicture }} style={styles.profileImage} />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, isDarkMode ? styles.darkText : styles.lightText]}>
              {userInfo.name}
            </Text>
            <Text style={[styles.userEmail, isDarkMode ? styles.darkText : styles.lightText]}>
              {userInfo.email}
            </Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsContainer}>
          <Text style={[styles.settingTitle, isDarkMode ? styles.darkText : styles.lightText]}>Settings</Text>

          {/* Notifications Option */}
          <TouchableOpacity style={styles.settingOption}>
            <Ionicons name="notifications" size={24} color={isDarkMode ? '#fff' : '#000'} />
            <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Notifications</Text>
          </TouchableOpacity>

          {/* Privacy Option */}
          <TouchableOpacity style={styles.settingOption}>
            <Ionicons name="lock-closed" size={24} color={isDarkMode ? '#fff' : '#000'} />
            <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Privacy</Text>
          </TouchableOpacity>

          {/* Dark Mode Switch */}
          <View style={styles.themeSwitchContainer}>
            <Text style={[styles.themeText, isDarkMode ? styles.darkText : styles.lightText]}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={[styles.logoutButton, isDarkMode ? styles.darkButton : styles.lightButton]}>
          <Ionicons name="log-out" size={20} color={isDarkMode ? '#fff' : '#000'} />
          <Text style={[styles.logoutText, isDarkMode ? styles.darkText : styles.lightText]}>Log Out</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileBackground: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  darkBackground: {
    backgroundColor: '#444',
  },
  lightBackground: {
    backgroundColor: '#6ec6ff',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
    fontFamily: 'Arial',
  },
  settingsContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  settingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'Arial',
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Arial',
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  themeText: {
    fontSize: 18,
    fontFamily: 'Arial',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'center',
  },
  darkButton: {
    backgroundColor: '#e74c3c', // Red color for dark mode
  },
  lightButton: {
    backgroundColor: '#3498db', // Blue color for light mode
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Arial',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default ProfileSettingsScreen;
