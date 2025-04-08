import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CheckoutScreen = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handleInputChange = (name, value) => {
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleCheckout = () => {
    alert('Checkout Successful!');
  };

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { opacity: fadeAnim }]}> 
        <Text style={styles.title}>Shipping Details</Text>
        <TextInput style={styles.input} placeholder="Full Name" value={shippingDetails.name} onChangeText={(text) => handleInputChange('name', text)} />
        <TextInput style={styles.input} placeholder="Shipping Address" value={shippingDetails.address} onChangeText={(text) => handleInputChange('address', text)} />
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={shippingDetails.phone} onChangeText={(text) => handleInputChange('phone', text)} />
      </Animated.View>

      <Text style={styles.title}>Payment Method</Text>
      <View style={styles.paymentOptions}>
        <TouchableOpacity onPress={() => handlePaymentMethodChange('paypal')} style={paymentMethod === 'paypal' ? styles.selected : styles.unselected}>
          <Image source={{ uri: 'https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg' }} style={styles.paymentLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePaymentMethodChange('visa')} style={paymentMethod === 'visa' ? styles.selected : styles.unselected}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' }} style={styles.paymentLogo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePaymentMethodChange('mastercard')} style={paymentMethod === 'mastercard' ? styles.selected : styles.unselected}>
          <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }} style={styles.paymentLogo} />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleCheckout}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paymentLogo: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#2E86C1',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  unselected: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  button: {
    backgroundColor: '#2E86C1',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;