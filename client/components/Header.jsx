import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import logo from "../assets/images/logo.jpg"
export default function Header() {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Image
            source={logo}
            style={{
              width: 45,
              height: 45,
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#ebebeb",
            borderRadius: 16,
            width: "70%",
          }}
        >
          <FontAwesome name="search" size={24} color="#000" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="black"
            style={{
              fontSize: 16,
              color: "#000",
            }}
          />
        </View>

        <View>
          <FontAwesome name="bars" size={28} color="#000" />
        </View>
      </View>
    </View>
  );
}
