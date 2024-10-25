import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: "rgb(76 112 222)",
        // borderBottomLeftRadius: 50,
        // borderBottomRightRadius: 50,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
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
            source={{
              uri: "https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg?s=612x612&w=0&k=20&c=sus8vhG3c__vCdvOBLDhuf2vPUgIAudIAeUBApU_7Ew=",
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 99,
            }}
          />
        </View>
      </View>
    </View>
  );
}
