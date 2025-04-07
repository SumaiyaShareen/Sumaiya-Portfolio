import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Text, Snackbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BudgetManagementScreen() {
  const [monthlyBudget, setMonthlyBudget] = useState("");
  const [categoryBudgets, setCategoryBudgets] = useState({
    Food: "",
    Transport: "",
    Entertainment: "",
    Shopping: "",
    Utilities: "",
  });
  const [expenses, setExpenses] = useState({
    Food: 2000,
    Transport: 1200,
    Entertainment: 500,
    Shopping: 800,
    Utilities: 1000,
  });

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const remainingBalance = monthlyBudget - totalExpenses;
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSetBudget = () => {
    if (!monthlyBudget || isNaN(monthlyBudget) || monthlyBudget <= 0) {
      alert("Please enter a valid budget amount.");
      return;
    }
    setSnackbarVisible(true);
  };

  return (
    <LinearGradient colors={["#1E3C72", "#2A5298"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>💰 Budget Overview</Text>

        <BlurView intensity={30} tint="light" style={styles.overviewCard}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="currency-inr" size={24} color="white" />
            <Text style={styles.cardTitle}>Total Budget:</Text>
            <Text style={styles.amount}>₹{monthlyBudget || "0"}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="cash-minus" size={24} color="white" />
            <Text style={styles.cardTitle}>Expenses:</Text>
            <Text style={styles.amount}>₹{totalExpenses}</Text>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons name="cash-check" size={24} color="white" />
            <Text style={[styles.amount, { color: remainingBalance < 0 ? "red" : "#00FF00" }]}>
              Remaining: ₹{remainingBalance}
            </Text>
          </View>
        </BlurView>

        <Text style={styles.subtitle}>📊 Category-wise Budget</Text>

        {Object.keys(categoryBudgets).map((category) => (
          <BlurView key={category} intensity={30} tint="light" style={styles.categoryCard}>
            <View style={styles.row}>
              <MaterialCommunityIcons
                name={
                  category === "Food"
                    ? "food"
                    : category === "Transport"
                    ? "bus"
                    : category === "Entertainment"
                    ? "gamepad-variant"
                    : category === "Shopping"
                    ? "shopping"
                    : "home-lightning-bolt"
                }
                size={24}
                color="#ADD8E6"
              />
              <Text style={styles.categoryTitle}>{category}</Text>
            </View>
            <TextInput
              label={`Set Budget for ${category} (₹)`}
              value={categoryBudgets[category]}
              onChangeText={(value) => setCategoryBudgets({ ...categoryBudgets, [category]: value })}
              keyboardType="numeric"
              mode="outlined"
              style={styles.input}
            />
          </BlurView>
        ))}

        <Text style={styles.subtitle}>⚙️ Budget Settings</Text>
        <BlurView intensity={30} tint="light" style={styles.card}>
          <Text style={styles.cardTitle}>Set Monthly Budget</Text>
          <TextInput
            label="Total Budget (₹)"
            value={monthlyBudget}
            onChangeText={setMonthlyBudget}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />
        </BlurView>

        <Button mode="contained" onPress={handleSetBudget} style={styles.setButton}>
          Save Budget
        </Button>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000}
          style={styles.snackbar}
        >
          🎯 Budget set successfully!
        </Snackbar>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "#FFF",
  },
  overviewCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  categoryCard: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  setButton: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    paddingVertical: 8,
    borderRadius: 15,
  },
  snackbar: {
    backgroundColor: "#000",
  },
});
