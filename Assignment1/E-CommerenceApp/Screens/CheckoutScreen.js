import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';




const CheckoutScreen = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handleInputChange = (name, value) => {
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleCheckout = () => {
    // Handle checkout logic (e.g., call API, validation, etc.)
    alert('Checkout Successful!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipping Details</Text>

      {/* Shipping Details Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={shippingDetails.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Shipping Address"
        value={shippingDetails.address}
        onChangeText={(text) => handleInputChange('address', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={shippingDetails.phone}
        onChangeText={(text) => handleInputChange('phone', text)}
      />

      <Text style={styles.title}>Payment Method</Text>

      {/* Payment Method Selection */}
      <Picker
        selectedValue={paymentMethod}
        style={styles.picker}
        onValueChange={handlePaymentMethodChange}
      >
        <Picker.Item label="Credit Card" value="creditCard" />
        <Picker.Item label="PayPal" value="paypal" />
        <Picker.Item label="Cash on Delivery" value="cod" />
      </Picker>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
