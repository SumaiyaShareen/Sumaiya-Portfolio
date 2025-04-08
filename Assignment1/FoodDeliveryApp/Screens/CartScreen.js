import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CartScreen = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Beef Burger', price: 5.99, image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg', quantity: 2 },
    { id: '2', name: 'Cheese Burger', price: 6.49, image: 'https://cdn.pixabay.com/photo/2017/08/30/07/51/pizza-2690765_1280.jpg', quantity: 1 },
    { id: '3', name: 'Veggie Burger', price: 4.99, image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/restaurant-1238237_1280.jpg', quantity: 1 }
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  // Render each cart item
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity}</Text>
      </View>
      <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart</Text>

      <FlatList 
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Total Price & Checkout Button */}
      <View style={styles.checkoutContainer}>
        <Text style={styles.totalText}>Total: ${totalPrice}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', padding: 15 },
  header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },

  cartItem: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 12, 
    marginBottom: 10, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 2 
  },
  itemImage: { width: 60, height: 60, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemPrice: { fontSize: 14, color: 'gray' },
  itemTotal: { fontSize: 16, fontWeight: 'bold', color: '#ff9800' },

  checkoutContainer: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    elevation: 3 
  },
  totalText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  checkoutButton: { 
    backgroundColor: '#ff9800', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 10, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 4 
  },
  checkoutText: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});

export default CartScreen;
