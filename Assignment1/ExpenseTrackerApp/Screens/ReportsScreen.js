import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { LineChart, PieChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

export default function ReportsScreen() {
  const [selectedTab, setSelectedTab] = useState("Weekly");
  
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [400, 600, 800, 500, 700, 300, 900],
      strokeWidth: 2,
    }],
  };
  
  const pieData = [
    { name: "Food", amount: 3000, color: "#FF6384", legendFontColor: "#333", legendFontSize: 15 },
    { name: "Transport", amount: 2000, color: "#36A2EB", legendFontColor: "#333", legendFontSize: 15 },
    { name: "Shopping", amount: 1500, color: "#FFCE56", legendFontColor: "#333", legendFontSize: 15 },
  ];

  return (
    <LinearGradient colors={["#FFFBEC", "#FCE38A"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Text style={styles.header}>Report</Text>
          <View style={styles.tabContainer}>
            {["Weekly", "Monthly", "Yearly"].map((tab) => (
              <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={selectedTab === tab ? styles.activeTab : styles.tab}>
                <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <PieChart
            data={pieData}
            width={300}
            height={150}
            chartConfig={{ color: () => `#333` }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="10"
          />
          <Text style={styles.subHeader}>Spending Trends</Text>
          <LineChart
            data={data}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
          />
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { alignItems: "center", paddingVertical: 20 },
  card: { width: "90%", borderRadius: 15, padding: 20, alignItems: "center", elevation: 5, backgroundColor: "white" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  tabContainer: { flexDirection: "row", justifyContent: "space-around", width: "100%", marginVertical: 15 },
  tab: { padding: 10, borderRadius: 20, backgroundColor: "#EAEAEA" },
  activeTab: { padding: 10, borderRadius: 20, backgroundColor: "#FFD700" },
  tabText: { fontSize: 16, color: "gray" },
  activeTabText: { fontSize: 16, color: "black", fontWeight: "bold" },
});
