import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const product = { id: productId, name: 'Product 1', price: '$100', description: 'This is a great product', image: 'https://via.placeholder.com/150' };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text>{product.description}</Text>
      <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, marginBottom: 20 },
});

export default ProductDetailsScreen;
