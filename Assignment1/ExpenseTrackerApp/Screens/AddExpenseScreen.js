import React, { useState } from "react";
import { 
  View, StyleSheet, KeyboardAvoidingView, Platform, 
  TouchableWithoutFeedback, Keyboard, ScrollView 
} from "react-native";
import { 
  TextInput, Button, Text, Menu, Divider, Appbar 
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddExpenseScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAddExpense = () => {
    if (!title || !amount || category === "Select Category") {
      alert("Please fill all fields!");
      return;
    }

    console.log("Expense Added:", { title, amount, category, date: date.toDateString() });
    alert("Expense Added Successfully!");
    setTitle("");
    setAmount("");
    setCategory("Select Category");
    setDate(new Date());
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Add Expense" />
        </Appbar.Header>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Expense Title */}
          <TextInput
            label="Expense Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />

          {/* Amount Input */}
          <TextInput
            label="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
          />

          {/* Category Dropdown */}
          <View style={{ zIndex: 10 }}>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button 
                  mode="outlined"
                  onPress={() => setMenuVisible(true)}
                  style={styles.input}
                >
                  {category}
                </Button>
              }
            >
              <Menu.Item onPress={() => setCategory("Food")} title="Food" />
              <Divider />
              <Menu.Item onPress={() => setCategory("Transport")} title="Transport" />
              <Divider />
              <Menu.Item onPress={() => setCategory("Shopping")} title="Shopping" />
              <Divider />
              <Menu.Item onPress={() => setCategory("Entertainment")} title="Entertainment" />
            </Menu>
          </View>

          {/* Date Picker */}
          <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.input}>
            Select Date: {date.toDateString()}
          </Button>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* Submit Button */}
          <Button mode="contained" onPress={handleAddExpense} style={styles.button}>
            Add Expense
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#6200ea",
  },
  content: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: "#6200ea",
  },
});

export default AddExpenseScreen;
