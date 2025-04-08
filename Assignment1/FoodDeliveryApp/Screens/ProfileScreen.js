import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Text, List, Divider, IconButton } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header with Back & Edit Buttons */}
      <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor="#fff" onPress={() => {}} />
        <Text variant="titleLarge" style={styles.headerTitle}>Profile</Text>
        <IconButton icon="pencil" size={24} iconColor="#fff" onPress={() => {}} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Avatar.Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbw7q1HLw1Z6NxRKIs_HMJ-iKQHaZ4XhqU-A&s' }} size={80} />
        <Text variant="titleMedium" style={styles.userName}>Sumaiya Shareen</Text>
        <Text variant="bodyMedium" style={styles.userEmail}>summi@gmail.com</Text>
      </View>

      {/* Profile Options */}
      <View style={styles.menu}>
        <List.Item title="Payment Methods" left={() => <List.Icon icon="credit-card" />} />
        <Divider />
        <List.Item title="Saved Addresses" left={() => <List.Icon icon="map-marker" />} />
        <Divider />
        <List.Item title="Favorite Orders" left={() => <List.Icon icon="heart" />} />
        <Divider />
        <List.Item title="My Orders" left={() => <List.Icon icon="clipboard-text" />} />
        <Divider />
        <List.Item title="Settings" left={() => <List.Icon icon="cog" />} />
        <Divider />
        <List.Item title="Notifications" left={() => <List.Icon icon="bell" />} />
        <Divider />
        <List.Item title="Log Out" left={() => <List.Icon icon="logout" />} titleStyle={{ color: 'red' }} />
      </View>

      {/* Order History Section */}
      <View style={styles.orderHistory}>
        <Text variant="titleMedium" style={styles.sectionTitle}>Order History</Text>

        {/* Current Orders */}
        <Text variant="titleSmall" style={styles.subTitle}>Current Orders</Text>
        <List.Item
          title="Order #1024 - Pizza Hut"
          description="On the way | $15.99"
          left={() => <List.Icon icon="truck" color="blue" />}
          right={() => <Text style={styles.statusBlue}>On the way</Text>}
        />
        <Divider />
        <List.Item
          title="Order #1023 - McDonald's"
          description="Preparing | $8.50"
          left={() => <List.Icon icon="clock" color="orange" />}
          right={() => <Text style={styles.statusOrange}>Preparing</Text>}
        />
        <Divider />

        {/* Past Orders */}
        <Text variant="titleSmall" style={styles.subTitle}>Past Orders</Text>
        <List.Item
          title="Order #1022 - Burger King"
          description="Delivered | $12.30"
          left={() => <List.Icon icon="check-circle" color="green" />}
          right={() => <Text style={styles.statusGreen}>Delivered</Text>}
        />
        <Divider />
        <List.Item
          title="Order #1021 - Subway"
          description="Cancelled | $10.20"
          left={() => <List.Icon icon="close-circle" color="red" />}
          right={() => <Text style={styles.statusRed}>Cancelled</Text>}
        />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1', // Light yellow background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFEB3B', // Yellow background for header
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  userEmail: {
    color: 'gray',
  },
  menu: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
  },
  orderHistory: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  sectionTitle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: 'bold',
    backgroundColor: '#FFEB3B', // Yellow background for section titles
  },
  subTitle: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: '600',
    color: 'gray',
  },
  statusBlue: {
    color: 'blue',
    fontWeight: 'bold',
  },
  statusOrange: {
    color: 'orange',
    fontWeight: 'bold',
  },
  statusGreen: {
    color: 'green',
    fontWeight: 'bold',
  },
  statusRed: {
    color: 'red',
    fontWeight: 'bold',
  },
});
