import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

// Import Screens
import DashboardScreen from "./screens/DashboardScreen";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import BudgetScreen from "./screens/BudgetScreen";
import ReportsScreen from "./screens/ReportsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Dashboard":
                iconName = "dashboard";
                break;
              case "Add Expense":
                iconName = "add-circle";
                break;
              case "Transactions":
                iconName = "receipt";
                break;
              case "Budget":
                iconName = "account-balance-wallet";
                break;
              case "Reports":
                iconName = "bar-chart";
                break;
              case "Profile":
                iconName = "person";
                break;
              default:
                iconName = "help";
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#bbb",
        })}
      >
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Add Expense" component={AddExpenseScreen} />
        <Tab.Screen name="Transactions" component={TransactionsScreen} />
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Reports" component={ReportsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#007bff", // Blue background
    paddingBottom: 5,
    height: 60,
    borderTopWidth: 0,
    elevation: 5,
  },
});
