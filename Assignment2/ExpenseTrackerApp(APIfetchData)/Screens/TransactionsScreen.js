import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from "react-native";
import { Card, Divider } from "react-native-paper";

const API_URL = "https://dummyjson.com/carts";

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Extract all products from carts
        const allProducts = data.carts.flatMap(cart =>
          cart.products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category || "General",
            image: product.thumbnail, // Product Image
            date: new Date().toLocaleDateString(), // Placeholder Date
          }))
        );

        setTransactions(allProducts);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch transactions.");
        setLoading(false);
      });
  }, []);

  const renderTransaction = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>📂 {item.category}</Text>
          <Text style={styles.amount}>💰 ${item.price}</Text>
          <Text style={styles.date}>📅 {item.date}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>Loading Transactions...</Text>
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
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTransaction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  },
  card: {
    backgroundColor: "#1E1E1E",
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    color: "#BBB",
    fontSize: 14,
    marginVertical: 2,
  },
  amount: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    color: "#BBB",
    fontSize: 14,
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
});

export default TransactionsScreen;
