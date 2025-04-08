import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

const RestaurantDetailsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Restaurant Details</Text>
      </View>
      
      {/* Restaurant Image */}
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnT5Xb87dAOMJ_6sreWu1OyobX5hfJg8TPxw&s' }} style={styles.image} />
      
      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.restaurantName}>Golden Dine</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={20} color="#FFD700" />
          <Text style={styles.ratingText}> 4.8 (120 Reviews)</Text>
        </View>
        <Text style={styles.address}><Ionicons name="location" size={16} color="#000" /> 123 Food Street, NY</Text>
      </View>
      
      {/* Restaurant Selection */}
      <Text style={styles.sectionTitle}>Popular Restaurants</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantList}>
        <View style={styles.restaurantItem}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLjJJYZT7sZgE2gugCEblms8TWaMc-Vww9A&s' }} style={styles.restaurantImage} />
          <Text style={styles.restaurantText}>The Gourmet Spot</Text>
        </View>
        <View style={styles.restaurantItem}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQUHQIPhiW0j9fhqnQys33HdMhH3mqo9Bd1Q&s'}} style={styles.restaurantImage} />
          <Text style={styles.restaurantText}>Flavors Avenue</Text>
        </View>
        <View style={styles.restaurantItem}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduwWWtPwNwwv0rCz_KG0pmm65J9uPxNX1pg&s' }} style={styles.restaurantImage} />
          <Text style={styles.restaurantText}>Elite Eats</Text>
        </View>
      </ScrollView>
      
      {/* Menu Section */}
      <Text style={styles.sectionTitle}>Menu</Text>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>🍕 Margherita Pizza - $12.99</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>🍔 Cheeseburger - $9.99</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.menuText}>🍝 Pasta Alfredo - $11.49</Text>
      </View>
      
      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoContainer: {
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  restaurantList: {
    flexDirection: 'row',
    marginTop: 10,
  },
  restaurantItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  restaurantImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  restaurantText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  menuItem: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutBtn: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#000',
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
};

export default RestaurantDetailsScreen;
