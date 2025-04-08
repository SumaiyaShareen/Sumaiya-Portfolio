import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const OrderTrackingScreen = () => {
  const order = {
    id: '12345',
    status: 'On the way',
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking</Text>
      <Text style={styles.subtitle}>Order ID: {order.id}</Text>
      <Text style={styles.status}>Status: {order.status}</Text>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: order.location.latitude,
          longitude: order.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={order.location}
          title="Delivery Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
    textAlign: 'center',
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: 'green',
  },
  map: {
    width: '100%',
    height: 300,
    marginTop: 16,
  },
});

export default OrderTrackingScreen;
