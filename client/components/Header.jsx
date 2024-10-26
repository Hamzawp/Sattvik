import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/images/logo.jpg";

// Import the products array with the img field added
const products = [
  {
    company_name: "Balaji Wafers",
    fssai_approved: true,
    product_name: "Balaji Wafers - Classic Salted",
    ingredients: ["Potato", "Palm Oil", "Salt", "Antioxidant (INS 330)"],
    img: "https://www.quickpantry.in/cdn/shop/files/balaji-wafers-simply-salted-quick-pantry-2.png?v=1710538876&width=460",
  },
  {
    company_name: "Pringles",
    fssai_approved: true,
    product_name: "Pringles Original",
    ingredients: [
      "Dehydrated Potatoes",
      "Vegetable Oil",
      "Rice Flour",
      "Wheat Starch",
      "Corn Flour",
      "Salt",
      "Maltodextrin",
      "Emulsifier (E471)",
    ],
    img: "https://m.media-amazon.com/images/I/71GvH9QK08L.jpg",
  },
  // Add the remaining products with their images...
];

export default function Header() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Find the product that matches the search query
      const matchedProduct = products.find((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchedProduct) {
        navigation.navigate("productdetail", { product: matchedProduct });
        setSearchQuery(""); // Clear the search input if desired
      } else {
        alert("Product not found.");
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
            style={{ width: 45, height: 45, borderRadius: 10 }}
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
            style={{ fontSize: 16, color: "#000" }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>

        <View>
          <FontAwesome name="bars" size={28} color="#000" />
        </View>
      </View>
    </View>
  );
}
