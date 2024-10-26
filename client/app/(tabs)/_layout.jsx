import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarActiveTintColor: Colors.green,
        tabBarStyle: {
          //   backgroundColor: Colors.GRAY,
          borderRadius: 20,
          position: "absolute",
          // bottom: 10,
          // left: 30,
          // right: 30,
          height: 75,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="UploadImg"
        options={{
          tabBarLabel: "Scan Food",
          tabBarIcon: ({ color }) => (
            <Ionicons name="scan" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="searchByImg"
        options={{
          tabBarLabel: "Import URL",
          tabBarIcon: ({ color }) => (
            <Ionicons name="link" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="foodAlergy"
        options={{
          tabBarLabel: "Allergy Tracker",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="disease" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
