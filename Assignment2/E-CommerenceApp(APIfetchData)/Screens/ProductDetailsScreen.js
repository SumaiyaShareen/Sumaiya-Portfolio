import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params; // Receiving product data as a prop

  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
  };

  const buyNow = () => {
    Alert.alert("Order Placed", `You have purchased ${product.name}.`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.row}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.rating}>
            <FontAwesome name="star" size={18} color="gold" />
            <FontAwesome name="star" size={18} color="gold" />
            <FontAwesome name="star" size={18} color="gold" />
            <FontAwesome name="star-half-full" size={18} color="gold" />
            <FontAwesome name="star-o" size={18} color="gold" />
            <Text style={styles.ratingText}>(4.5)</Text>
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>
        
        <Text style={[styles.stockStatus, { color: product.inStock ? '#28a745' : '#dc3545' }]}>
          {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <AntDesign name="minuscircleo" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF' },
  productImage: { width: '100%', height: 300, resizeMode: 'cover' },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 22, fontWeight: 'bold', color: '#007bff' },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 5, fontSize: 16, color: '#555' },
  description: { fontSize: 16, color: '#666', marginVertical: 10 },
  stockStatus: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  quantity: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  addToCartButton: { flex: 1, backgroundColor: '#ffcc00', padding: 15, borderRadius: 8, alignItems: 'center', marginRight: 10 },
  buyNowButton: { flex: 1, backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
});

export default ProductDetailScreen;
