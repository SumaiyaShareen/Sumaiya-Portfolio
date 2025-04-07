import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: '12345',
      orderDate: '2025-02-20',
      items: [
        { id: '1', name: 'T-shirt', quantity: 2, price: 20 },
        { id: '2', name: 'Jeans', quantity: 1, price: 40 },
      ],
      deliveryStatus: 'Delivered',
      deliveryDate: '2025-02-22',
    },
    {
      id: '2',
      orderNumber: '12346',
      orderDate: '2025-02-18',
      items: [
        { id: '3', name: 'Shoes', quantity: 1, price: 50 },
        { id: '4', name: 'Hat', quantity: 1, price: 15 },
      ],
      deliveryStatus: 'In Transit',
      deliveryDate: 'N/A',
    },
  ]);

  const renderOrderItem = ({ item }) => {
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderNumber}>Order #{item.orderNumber}</Text>
        <Text style={styles.orderDate}>Order Date: {item.orderDate}</Text>
        <Text style={[styles.deliveryStatus, item.deliveryStatus === 'Delivered' && styles.deliveredStatus]}>
          {item.deliveryStatus}
        </Text>
        {item.deliveryStatus === 'Delivered' && <Text style={styles.deliveryDate}>Delivered on: {item.deliveryDate}</Text>}

        <View style={styles.itemsContainer}>
          <Text style={styles.itemsTitle}>Items:</Text>
          {item.items.map((product) => (
            <View key={product.id} style={styles.item}>
              <Text style={styles.itemName}>{product.name}</Text>
              <Text style={styles.itemQuantity}>x{product.quantity}</Text>
              <Text style={styles.itemPrice}>${product.price * product.quantity}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.viewDetailsButton}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Ionicons name="ios-arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#ffffff', '#6ec6ff']} style={styles.container}>
      <Text style={styles.headerText}>Order History</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1a1a1a',
    letterSpacing: 1,
  },
  orderItem: {
    backgroundColor: '#fff',
    marginBottom: 18,
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  orderDate: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  deliveryStatus: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e67e22', // Default color for status
    marginTop: 8,
  },
  deliveredStatus: {
    color: '#27ae60', // Green for 'Delivered'
  },
  deliveryDate: {
    fontSize: 16,
    color: '#27ae60', // Green for delivered date
    marginTop: 6,
  },
  itemsContainer: {
    marginTop: 12,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#333',
    flex: 0.5,
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    flex: 0.5,
    textAlign: 'right',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewDetailsText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
    fontWeight: '600',
  },
});

export default OrderHistoryScreen;
