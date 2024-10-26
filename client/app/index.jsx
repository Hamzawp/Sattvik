import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import logo from "../assets/images/logo.jpg";
import getstarted from "../assets/images/getstarted.jpg";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: "#fff",
        height: '100%',
      }}
    >
      <View
        style={{
          borderBottomLeftRadius: 99,
          borderBottomRightRadius: 99,
          backgroundColor: "#ecf2f3",
          paddingBottom: 75,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
            marginVertical: 30
          }}
        >
          <Image
            source={logo}
            style={{
              width: 50,
              height: 50,
            }}
          />

          <Text
            style={{
              color: "#45b3cb",
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Skip
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 75,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              marginBottom: 20,
              color: "#45b3cb",
            }}
          >
            HolaDok.
          </Text>
          <Image
            source={getstarted}
            style={{
              width: 330,
              height: 275,
            }}
          />
        </View>
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Your Best Allergy Assistant
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
          }}
        >
          Dapatkan layannan mdeis speical
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "400",
          }}
        >
          untuk kamum 24jan
        </Text>
      </View>

      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 30
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#45b3cb",
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}
          onPress={() => router.push("/Home")}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: 600,
              fontSize: 21,
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
