import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  // ✅ **Fetch API Data**
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');

      if (response.data.meals) {
        const formattedData = response.data.meals.map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal,
          cuisine: meal.strCategory || 'Unknown',
          image: meal.strMealThumb
        }));

        setRestaurants(formattedData);
        setFilteredRestaurants(formattedData);
      } else {
        throw new Error('No restaurants found.');
      }

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // ✅ **Filter by Cuisine**
  const filterByCuisine = (cuisine) => {
    setSelectedCuisine(cuisine);
    if (cuisine === 'All') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant => restaurant.cuisine === cuisine);
      setFilteredRestaurants(filtered);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* ✅ Search Bar */}
      <TextInput placeholder="Find your taste" style={styles.searchInput} placeholderTextColor="gray" />

      {/* ✅ Cuisine Filters */}
      <View style={styles.filterContainer}>
        {['All', 'Beef', 'Chicken', 'Vegetarian', 'Seafood'].map((cuisine, index) => (
          <TouchableOpacity key={index} style={[styles.filterButton, selectedCuisine === cuisine && styles.selectedButton]} onPress={() => filterByCuisine(cuisine)}>
            <Text style={styles.filterText}>{cuisine}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ Nearest Restaurants - Full Page Grid Layout */}
      <Text style={styles.sectionTitle}>Nearest Restaurants</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#ff9800" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // ✅ Display restaurants in 2 columns
          columnWrapperStyle={styles.row} // ✅ Ensure proper spacing
          renderItem={({ item }) => (
            <View style={styles.restaurantCard}>
              <Image source={{ uri: item.image }} style={styles.restaurantImage} />
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

// ✅ **Styles**
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  searchInput: { backgroundColor: '#f0f0f0', borderRadius: 8, padding: 8, fontSize: 16, marginBottom: 16 },
  
  // Cuisine Filters
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  filterButton: { padding: 10, backgroundColor: '#ddd', borderRadius: 8 },
  selectedButton: { backgroundColor: '#ff9800' },
  filterText: { fontWeight: 'bold' },

  // Section Title
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },

  // Grid Layout for Restaurants
  row: { justifyContent: 'space-between', marginBottom: 10 },
  restaurantCard: { flex: 1, margin: 5, backgroundColor: '#f9f9f9', borderRadius: 10, padding: 10, alignItems: 'center' },
  restaurantImage: { width: '100%', height: 150, borderRadius: 10 },
  restaurantName: { marginTop: 5, fontWeight: 'bold', textAlign: 'center' },
  restaurantCuisine: { color: 'gray' },

  // Error Message
  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
});

export default HomeScreen;
