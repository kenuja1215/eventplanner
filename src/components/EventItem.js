import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function EventItem({ event, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{event.title}</Text>

      <Text style={styles.details}>Date: {event.date}</Text>

      <Text style={styles.details}>
        Location: {event.location}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(event)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(event.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 10,
  },
  details: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  editButton: {
    backgroundColor: "#16A34A",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});