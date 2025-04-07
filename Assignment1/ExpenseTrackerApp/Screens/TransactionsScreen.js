import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const transactions = [
  { id: "1", name: "Netflix", amount: "- $15.99", date: "Feb 20, 2025", type: "expense", icon: "logo-netflix" },
  { id: "2", name: "Salary", amount: "+ $2000", date: "Feb 18, 2025", type: "income", icon: "briefcase" },
  { id: "3", name: "Groceries", amount: "- $85.40", date: "Feb 15, 2025", type: "expense", icon: "cart" },
  { id: "4", name: "Freelance", amount: "+ $350", date: "Feb 12, 2025", type: "income", icon: "cash" },
];

export default function TransactionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.type === "income" ? styles.income : styles.expense]}>
            <Ionicons name={item.icon} size={24} color="#fff" style={styles.icon} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={[styles.amount, item.type === "income" ? styles.incomeText : styles.expenseText]}>
              {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e3f2fd",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1565c0",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#1565c0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  income: {
    borderLeftWidth: 5,
    borderLeftColor: "#1e88e5",
  },
  expense: {
    borderLeftWidth: 5,
    borderLeftColor: "#d32f2f",
  },
  icon: {
    marginRight: 15,
    backgroundColor: "#1e88e5",
    padding: 8,
    borderRadius: 8,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
  },
  date: {
    fontSize: 14,
    color: "#6c757d",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  incomeText: {
    color: "#1e88e5",
  },
  expenseText: {
    color: "#d32f2f",
  },
});
