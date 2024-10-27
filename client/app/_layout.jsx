import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout() {
  useFonts({
    "Montserrat": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
