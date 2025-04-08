import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { CartContext } from '../screens/CartContext'; // ✅ Import CartContext

const CartScreen = () => {
  const { cart } = useContext(CartContext); // ✅ Use CartContext to get Cart Data

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#B3E0FF' }, // Light Blue Background
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  emptyCart: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'gray' },
  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 10, elevation: 3 },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  name: { flex: 1, fontSize: 16 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#007bff' },
});


export default CartScreen;
