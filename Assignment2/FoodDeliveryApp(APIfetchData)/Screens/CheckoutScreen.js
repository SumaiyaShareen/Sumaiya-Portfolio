import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [promoCode, setPromoCode] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Checkout Title */}
      <Text style={styles.checkoutTitle}>Checkout</Text>

      {/* Delivery Address Section */}
      <View style={styles.card}>
        <Text style={styles.addressHeader}>Delivery Address</Text>
        <Text style={styles.addressText}>John Doe - 123 Street, City</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Address</Text>
        </TouchableOpacity>
      </View>

      {/* Order Summary */}
      <View style={styles.card}>
        <Text style={styles.orderSummaryHeader}>Order Summary</Text>
        <Text style={styles.itemText}>Pizza - $12.99</Text>
        <Text style={styles.itemText}>Burger - $8.50</Text>
        <View style={styles.subtotal}>
          <Text>Subtotal: $21.49</Text>
          <Text>Delivery Fee: $3.00</Text>
          <Text style={styles.totalText}>Total: $24.49</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.card}>
        <Text style={styles.paymentHeader}>Payment Methods</Text>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setPaymentMethod('Card')}
        >
          <Icon name="credit-card" size={24} color="#f1c40f" />
          <Text style={styles.paymentText}>Credit/Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setPaymentMethod('Wallet')}
        >
          <Icon name="wallet" size={24} color="#f1c40f" />
          <Text style={styles.paymentText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => setPaymentMethod('Cash')}
        >
          <Icon name="money" size={24} color="#f1c40f" />
          <Text style={styles.paymentText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <Text style={styles.securePayment}>Secure Payment</Text>
      </View>

      {/* Promo Code */}
      <View style={styles.card}>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter Promo Code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmText}>Confirm and Pay</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  backButton: {
    padding: 10,
  },
  checkoutTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addressHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: '#f1c40f',
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderSummaryHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  itemText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  subtotal: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalText: {
    color: '#e67e22',
    fontSize: 20,
  },
  paymentMethods: {
    marginBottom: 20,
  },
  paymentHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
  },
  securePayment: {
    fontSize: 14,
    color: '#2ecc71',
    textAlign: 'center',
    marginTop: 10,
  },
  promoInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#f1c40f',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
