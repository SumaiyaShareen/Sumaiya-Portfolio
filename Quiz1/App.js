import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";

export default function WeatherApp() {
  const [isCelsius, setIsCelsius] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const temperature = isCelsius ? "18°C" : `${(18 * 9) / 5 + 32}°F`;

  return (
    <LinearGradient colors={["#1E1E2C", "#3A3D5A"]} style={styles.container}>
      {/* Time & Date */}
      <Text style={styles.time}>{time.toLocaleTimeString()}</Text>
      <Text style={styles.date}>{time.toDateString()}</Text>

      {/* City & Temperature Section */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 1000 }}
        style={styles.weatherContainer}
      >
        <Text style={styles.city}>ISLAMABAD</Text>
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "spring", damping: 8 }}
        >
          <MaterialIcons name="wb-cloudy" size={100} color="white" />
        </MotiView>
        <MotiView
          from={{ scale: 0.9 }}
          animate={{ scale: 1.1 }}
          transition={{ loop: true, type: "timing", duration: 2000 }}
        >
          <Text style={styles.temperature}>{temperature}</Text>
        </MotiView>
        <Text style={styles.condition}>Cloudy</Text>
      </MotiView>

      {/* Extra Weather Info */}
      <View style={styles.extraInfo}>
        <View style={styles.infoBox}>
          <MaterialIcons name="air" size={24} color="white" />
          <Text style={styles.infoText}>Wind: 12 km/h</Text>
        </View>
        <View style={styles.infoBox}>
          <MaterialIcons name="opacity" size={24} color="white" />
          <Text style={styles.infoText}>Humidity: 78%</Text>
        </View>
      </View>

      {/* Forecast Section */}
      <View style={styles.forecastContainer}>
        {[
          { name: "wb-sunny", color: "gold", temp: "20°C" },
          { name: "cloud", color: "lightgray", temp: "16°C" },
          { name: "thunderstorm", color: "yellow", temp: "14°C" },
        ].map((item, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: index * 200 }}
            style={styles.forecastItem}
          >
            <MaterialIcons name={item.name} size={30} color={item.color} />
            <Text style={styles.forecastTemp}>{item.temp}</Text>
          </MotiView>
        ))}
      </View>

      {/* Temperature Toggle */}
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>°C</Text>
        <Switch
          value={!isCelsius}
          onValueChange={() => setIsCelsius((prev) => !prev)}
        />
        <Text style={styles.toggleText}>°F</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "lightgray",
    marginBottom: 10,
  },
  weatherContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  city: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  temperature: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
  },
  condition: {
    fontSize: 20,
    color: "white",
    marginTop: 5,
  },
  extraInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 10,
  },
  infoText: {
    color: "white",
    marginLeft: 10,
  },
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 15,
  },
  forecastItem: {
    alignItems: "center",
  },
  forecastTemp: {
    fontSize: 18,
    color: "white",
    marginTop: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  toggleText: {
    fontSize: 18,
    color: "white",
    marginHorizontal: 10,
  },
});
