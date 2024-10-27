import { View, Text, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import logo from "../assets/images/logo.png";

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
      const matchedProduct = products.find((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchedProduct) {
        navigation.navigate("productdetail", { product: matchedProduct });
        setSearchQuery("");
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
            style={{ fontSize: 16, color: "#000", fontFamily: 'Montserrat' }}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchSubmit}
          />
        </View>

        {/* <View>
          <FontAwesome name="bars" size={28} color="#45b3cb" />
        </View> */}
      </View>
    </View>
  );
}
