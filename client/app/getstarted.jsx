import { View, Text, Image } from "react-native";
import React from "react";
import logo from "../assets/images/logo.jpg";

export default function getstarted() {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 20
        }}
      >
        <Image
          source={logo}
          style={{
            width: 75,
            height: 75,
          }}
        />

        <Text>Skip</Text>
      </View>
    </View>
  );
}
