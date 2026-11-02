import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import EventForm from "./src/components/EventForm";
import EventList from "./src/components/EventList";

const STORAGE_KEY = "@event_planner_events";

export default function App() {

  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved events when app starts
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const savedEvents = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedEvents !== null) {
          const parsedEvents = JSON.parse(savedEvents);

          if (Array.isArray(parsedEvents)) {
            setEvents(parsedEvents);
          }
        }

        setIsLoaded(true);

      } catch (error) {
        console.log("Error loading events:", error);

        Alert.alert(
          "Storage Error",
          "Could not load saved events. Please restart the app."
        );
      }
    };

    loadEvents();
  }, []);

  // Automatically save events when they change
  useEffect(() => {
    if (!isLoaded) return;

    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(events)
        );

        console.log("Events saved successfully");

      } catch (error) {
        console.log("Error saving events:", error);

        Alert.alert(
          "Save Error",
          "Could not save events to device storage."
        );
      }
    };

    saveEvents();
  }, [events, isLoaded]);


  // Add or Update Event
  const saveEvent = (eventData) => {

    if (editingEvent) {

      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          event.id === editingEvent.id
            ? { ...event, ...eventData }
            : event
        )
      );

    } else {

      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
      };

      setEvents((currentEvents) => [
        ...currentEvents,
        newEvent,
      ]);
    }

    setShowForm(false);
    setEditingEvent(null);
  };


  // Edit Event
  const editEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };


  // Delete Event
  const deleteEvent = (id) => {

    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setEvents((currentEvents) =>
              currentEvents.filter(
                (event) => event.id !== id
              )
            );
          },
        },
      ]
    );
  };


  // Cancel Form
  const cancelForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };


  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor="#1E40AF"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Event Planner
        </Text>

        <Text style={styles.subtitle}>
          Manage your events easily
        </Text>
      </View>

      {!isLoaded ? (

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />

          <Text style={styles.loadingText}>
            Loading Events...
          </Text>
        </View>

      ) : !showForm ? (

        <>
          <View style={styles.topSection}>

            <Text style={styles.sectionTitle}>
              My Events
            </Text>

            <Text style={styles.eventCount}>
              Total Events: {events.length}
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setEditingEvent(null);
                setShowForm(true);
              }}
            >
              <Text style={styles.addButtonText}>
                + Add New Event
              </Text>
            </TouchableOpacity>

          </View>

          <EventList
            events={events}
            onEdit={editEvent}
            onDelete={deleteEvent}
          />
        </>

      ) : (

        <ScrollView keyboardShouldPersistTaps="handled">

          <EventForm
            initialEvent={editingEvent}
            onSave={saveEvent}
            onCancel={cancelForm}
          />

        </ScrollView>

      )}

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    backgroundColor: "#1E40AF",
    padding: 25,
    paddingTop: 45,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 14,
    color: "#DBEAFE",
    marginTop: 5,
  },

  topSection: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1E293B",
  },

  eventCount: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 5,
  },

  addButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#64748B",
  },

});