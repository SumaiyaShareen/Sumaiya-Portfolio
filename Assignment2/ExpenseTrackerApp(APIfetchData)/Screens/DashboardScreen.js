import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import { Card, Divider } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const API_URL = "https://dummyjson.com/carts";

const DashboardScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totals, setTotals] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const allTransactions = data.carts.flatMap((cart) =>
          cart.products.map((product) => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category || "General",
            date: new Date().toDateString(), // Mock Date
            isExpense: product.price > 100, // Assume items over 100 are expenses
          }))
        );

        setTransactions(allTransactions);

        // Calculate totals
        const totalIncome = allTransactions
          .filter((t) => !t.isExpense)
          .reduce((sum, t) => sum + t.price, 0);
        const totalExpenses = allTransactions
          .filter((t) => t.isExpense)
          .reduce((sum, t) => sum + t.price, 0);
        const balance = totalIncome - totalExpenses;

        setTotals({ income: totalIncome, expenses: totalExpenses, balance });

        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch transactions.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Loading Dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.row}>
        <Card style={[styles.card, styles.incomeCard]}>
          <Text style={styles.cardTitle}>Total Income</Text>
          <Text style={styles.cardAmount}>${totals.income.toFixed(2)}</Text>
        </Card>

        <Card style={[styles.card, styles.expenseCard]}>
          <Text style={styles.cardTitle}>Total Expenses</Text>
          <Text style={styles.cardAmount}>${totals.expenses.toFixed(2)}</Text>
        </Card>
      </View>

      <Card style={[styles.card, styles.balanceCard]}>
        <Text style={styles.cardTitle}>Balance</Text>
        <Text
          style={[
            styles.cardAmount,
            { color: totals.balance >= 0 ? "#4CAF50" : "#E53935" },
          ]}
        >
          ${totals.balance.toFixed(2)}
        </Text>
      </Card>

      {/* Pie Chart */}
      <PieChart
        data={[
          {
            name: "Income",
            amount: totals.income,
            color: "#4CAF50",
            legendFontColor: "#FFF",
            legendFontSize: 14,
          },
          {
            name: "Expenses",
            amount: totals.expenses,
            color: "#E53935",
            legendFontColor: "#FFF",
            legendFontSize: 14,
          },
        ]}
        width={Dimensions.get("window").width - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#121212",
          backgroundGradientTo: "#121212",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* Recent Transactions */}
      <Text style={styles.transactionTitle}>Recent Transactions</Text>
      <FlatList
        data={transactions.slice(0, 5)} // Show only 5 recent transactions
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>{item.title}</Text>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            <Text
              style={[
                styles.transactionAmount,
                { color: item.isExpense ? "#E53935" : "#4CAF50" },
              ]}
            >
              ${item.price.toFixed(2)}
            </Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <Divider style={{ backgroundColor: "#444" }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    flex: 1,
  },
  incomeCard: {
    marginRight: 10,
  },
  expenseCard: {
    marginLeft: 10,
  },
  balanceCard: {
    backgroundColor: "#1A237E",
  },
  cardTitle: {
    color: "#BBB",
    fontSize: 14,
  },
  cardAmount: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    color: "#BBB",
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#1E1E1E",
    marginVertical: 5,
    borderRadius: 8,
  },
  transactionText: {
    fontSize: 16,
    color: "#FFF",
    flex: 2,
  },
  transactionCategory: {
    fontSize: 14,
    color: "#BBB",
    flex: 1,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  transactionDate: {
    fontSize: 12,
    color: "#777",
    flex: 1,
    textAlign: "right",
  },
});

export default DashboardScreen;
