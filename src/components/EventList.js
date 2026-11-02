import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import EventItem from "./EventItem";

export default function EventList({ events, onEdit, onDelete }) {
  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <EventItem
          event={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No events available
          </Text>

          <Text style={styles.message}>
            Click Add Event to create your first event.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#64748B",
  },
  message: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 10,
    textAlign: "center",
  },
});