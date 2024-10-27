import { View, Text, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/images/logo.png";

export default function Header() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await fetch(
          `http://10.0.2.2:5000/searchProduct`,
          {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ text: searchQuery }), // Send search query in JSON format
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data); // Check what is returned

        if (data.matched_products && data.matched_products.length > 0) {
          navigation.navigate("productdetail", { product: data.matched_products[0] });
          setSearchQuery("");
        } else {
          Alert.alert("Product not found.");
        }
      } catch (error) {
        Alert.alert("Error fetching data", error.message);
      }
    }
  };

  return (
    <View style={{ padding: 20, paddingTop: 50, backgroundColor: "#fff" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
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
            style={{ width: 55, height: 55, borderRadius: 10 }}
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
            backgroundColor: "#ecf2f3",
            borderRadius: 16,
            width: "80%",
          }}
        >
          <FontAwesome
            name="search"
            size={24}
            color="#45b3cb"
            style={{ fontFamily: "Montserrat" }}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="black"
            style={{ fontSize: 16, color: "#000", fontFamily: "Montserrat" }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>
      </View>
    </View>
  );
}
