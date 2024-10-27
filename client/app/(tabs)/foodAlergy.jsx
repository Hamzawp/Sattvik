import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";

export default function FoodAllergy() {
  const [allergies, setAllergies] = useState("");

  const checkAllergies = async () => {
    const userAllergies = allergies
      .split(",")
      .map((allergy) => allergy.trim().toLowerCase());

    try {
      const response = await fetch("http://10.0.2.2:5000/check_allergy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ allergies: userAllergies }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Check if any of the food products contains allergens
      const unsafeProducts = data.filter((item) => !item.Safe);

      if (unsafeProducts.length > 0) {
        const allergens = unsafeProducts
          .map((item) => item["Food Product"])
          .join(", ");

        Alert.alert(
          "Warning!",
          `The following food products are not safe for you: ${allergens}`
        );
      } else {
        Alert.alert("Safe!", "All food products are safe for you.");
      }
    } catch (error) {
      console.error("Error checking allergies:", error);
      Alert.alert(
        "Error!",
        "There was an error checking your allergies. Please try again."
      );
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://www.metropolisindia.com/upgrade/blog/upload/24/02/How-To-Get-Tested-For-Food-Allergies1708000435.webp",
          }}
          style={styles.allergyImg}
        />
        <Text style={styles.title}>
          Enter your allergies (comma separated):
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setAllergies}
          value={allergies}
          placeholder="e.g., peanuts, shellfish"
        />
        <TouchableOpacity style={styles.analyzeBtn} onPress={checkAllergies}>
          <Text style={styles.analyzeBtnText}>Check Allergies</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 40,
    backgroundColor: "#ecf2f3",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ecf2f3",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat-bold",
    marginBottom: 25,
    color: "#4cb3d0",
  },
  input: {
    height: 50,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    fontFamily: "Montserrat",
  },
  analyzeBtn: {
    backgroundColor: "#4cb3d0",
    color: "#000",
    borderRadius: 15,
    height: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  analyzeBtnText: {
    color: "#fff",
    fontFamily: "Montserrat-bold",
    fontSize: 18,
  },
  allergyImg: {
    width: "100%",
    height: 350,
    marginBottom: 30,
    borderRadius: 8,
  },
});
