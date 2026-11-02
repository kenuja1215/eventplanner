import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function EventForm({ onSave, onCancel, initialEvent }) {
  const [title, setTitle] = useState(initialEvent?.title || "");
  const [date, setDate] = useState(initialEvent?.date || "");
  const [location, setLocation] = useState(initialEvent?.location || "");

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !location.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date.trim())) {
      Alert.alert("Error", "Use date format YYYY-MM-DD");
      return;
    }

    onSave({
      title: title.trim(),
      date: date.trim(),
      location: location.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {initialEvent ? "Edit Event" : "Add New Event"}
      </Text>

      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event name"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Event Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {initialEvent ? "Update Event" : "Save Event"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    margin: 15,
    borderRadius: 15,
    elevation: 3,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E293B",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 15,
    alignItems: "center",
  },
  cancelText: {
    color: "#64748B",
    fontSize: 16,
  },
});