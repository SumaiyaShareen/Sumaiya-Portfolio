import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { Card, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";

export default function DashboardScreen() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Dummy data for expenses
  const expenseData = [
    { name: "Personal Care", amount: 5000, color: "#FF6384" },
    { name: "Groceries", amount: 8000, color: "#36A2EB" },
    { name: "Clothing", amount: 4000, color: "#FFCE56" },
    { name: "Eating Out", amount: 6000, color: "#4BC0C0" },
    { name: "Entertainment", amount: 7000, color: "#9966FF" },
    { name: "Fuel", amount: 3000, color: "#FF9F40" },
  ];

  const chartData = expenseData.map((item) => ({
    name: item.name,
    amount: item.amount,
    color: item.color,
    legendFontColor: darkMode ? "#fff" : "#000",
    legendFontSize: 12,
  }));

  return (
    <ScrollView
      style={[styles.container, darkMode ? styles.darkBackground : styles.lightBackground]}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={[styles.greeting, darkMode ? styles.textLight : styles.textDark]}>
          Hi Summi
        </Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>

      {/* Total Expenses */}
      <Card style={[styles.card, darkMode ? styles.darkCard : styles.lightCard]}>
        <View style={styles.row}>
          <Text style={[styles.totalExpense, darkMode ? styles.textLight : styles.textDark]}>
            ₹ 13,200
          </Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <Text style={styles.subtitle}>Total Expense Till Now</Text>
      </Card>

      {/* Pie Chart */}
      <Text style={[styles.sectionTitle, darkMode ? styles.textLight : styles.textDark]}>
        OVERALL EXPENSES
      </Text>
      <PieChart
        data={chartData}
        width={350}
        height={200}
        chartConfig={{
          backgroundColor: darkMode ? "#222" : "#fff",
          backgroundGradientFrom: darkMode ? "#222" : "#fff",
          backgroundGradientTo: darkMode ? "#333" : "#eee",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"10"}
        absolute
      />

      {/* Budget Summary Cards */}
      <View style={styles.cardContainer}>
        <Card style={[styles.summaryCard, darkMode ? styles.darkCard : styles.lightCard]}>
          <Ionicons name="cash" size={24} color="blue" />
          <Text style={[styles.amount, darkMode ? styles.textLight : styles.textDark]}>₹ 60,000</Text>
          <Text style={styles.label}>Total Income</Text>
        </Card>

        <Card style={[styles.summaryCard, darkMode ? styles.darkCard : styles.lightCard]}>
          <Ionicons name="wallet" size={24} color="green" />
          <Text style={[styles.amount, darkMode ? styles.textLight : styles.textDark]}>₹ 53,200</Text>
          <Text style={styles.label}>Bank Balance</Text>
        </Card>

        <Card style={[styles.summaryCard, darkMode ? styles.darkCard : styles.lightCard]}>
          <Ionicons name="alert-circle" size={24} color="red" />
          <Text style={[styles.amount, darkMode ? styles.textLight : styles.textDark]}>₹ 13,000</Text>
          <Text style={styles.label}>Total Dues</Text>
        </Card>
      </View>

      {/* Set Budget Button */}
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  lightBackground: {
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
  },
  textDark: {
    color: "#000",
  },
  textLight: {
    color: "#fff",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  darkCard: {
    backgroundColor: "#222",
  },
  lightCard: {
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalExpense: {
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAll: {
    color: "#6200ea",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 10,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  label: {
    fontSize: 12,
    color: "#777",
  },
  
});
