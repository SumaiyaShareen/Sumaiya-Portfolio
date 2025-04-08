import React, { useState } from "react";
import { View, StyleSheet, Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { Ionicons, FontAwesome, MaterialIcons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <LinearGradient
      colors={isDarkMode ? ["#1A202C", "#2D3748"] : ["#5A67D8", "#3182CE"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <View style={styles.header}>
            <Image
              source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiUUELNw45eGJCzwY5LcZzE1muMlUAHL52iQ&s" }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color={isDarkMode ? "white" : "black"} />
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={[styles.name, isDarkMode ? styles.darkText : styles.lightText]}>Sumaiya Shareen</Text>
            <Text style={[styles.email, isDarkMode ? styles.darkText : styles.lightText]}>summi@gmail.com</Text>
            <Text style={[styles.phone, isDarkMode ? styles.darkText : styles.lightText]}>+92 3347384789</Text>
          </View>

          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={[styles.sectionText, isDarkMode ? styles.darkText : styles.lightText]}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
          </View>
          <Divider style={styles.divider} />

          {/* Profile Options */}
          <TouchableOpacity style={styles.option}>
            <FontAwesome name="user" size={22} color="#5A67D8" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="lock" size={22} color="#48BB78" />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <Feather name="bell" size={22} color="#ED8936" />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="settings" size={22} color="#3182CE" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logout}>
            <Ionicons name="log-out-outline" size={22} color="red" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  card: {
    width: "90%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  darkCard: {
    backgroundColor: "#2D3748",
  },
  lightCard: {
    backgroundColor: "white",
  },
  header: {
    position: "relative",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#5A67D8",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: -10,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    padding: 6,
    elevation: 2,
  },
  userInfo: {
    alignItems: "center",
    marginVertical: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
  phone: {
    fontSize: 16,
    color: "gray",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#EDF2F7",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "500",
    color: "#2D3748",
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "#FED7D7",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#CBD5E0",
    marginVertical: 10,
  },
  darkText: {
    color: "white",
  },
  lightText: {
    color: "black",
  },
});
