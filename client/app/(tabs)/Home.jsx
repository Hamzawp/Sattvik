import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { FontAwesome } from "@expo/vector-icons";

export default function Home() {
  return (
    <View>
      <View>
        <Header />
      </View>

      <View style={styles.feature_container}>
        <View style={styles.feature_item}>
          <View style={styles.feature_img}>
            <FontAwesome name="search" size={50} color="#45b3cb" />
          </View>
          <View>
            <Text>Feature 1</Text>
            <Text>Lorem ipsum dolor sit amet.</Text>
          </View>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  feature_container: {
    display: "flex",
    margin: 20
  },
  feature_item: {
    display: "flex",
    alignItems: "center",
    width: 125,
    padding: 20,
  },
  feature_img: {
    borderWidth: 1,
    borderColor: '#45b3cb',
    padding: 10,
    width: 125,
    display: "flex",
    alignItems: "center",
    borderRadius: 15
  }
});
