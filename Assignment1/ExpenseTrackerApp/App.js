import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider as PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

// Import Screens
import DashboardScreen from "./screens/DashboardScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import ReportsScreen from "./screens/ReportsScreen";
import BudgetScreen from "./screens/BudgetScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                const icons = {
                  Dashboard: "home",
                  "Add Expense": "add-circle",
                  Transactions: "list",
                  Reports: "bar-chart",
                  Budget: "wallet",
                  Profile: "settings",
                };
                return <Ionicons name={icons[route.name]} size={size} color={color} />;
              },
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: "white",
              tabBarInactiveTintColor: "#bbb",
            })}
          >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Add Expense" component={AddExpenseScreen} />
            <Tab.Screen name="Transactions" component={TransactionsScreen} />
            <Tab.Screen name="Reports" component={ReportsScreen} />
            <Tab.Screen name="Budget" component={BudgetScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark theme background
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  tabBar: {
    backgroundColor: "#6200ea",
    paddingBottom: 5,
    height: 60,
    borderTopWidth: 0,
    elevation: 5,
  },
});
