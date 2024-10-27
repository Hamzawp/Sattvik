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
} from "react-native";
import Header from "../../components/Header";

export default function FoodAllergy() {
  const [allergies, setAllergies] = useState("");
  const ingredients = ["peanuts", "shellfish", "milk", "eggs"]; // Example ingredient list

  const checkAllergies = () => {
    const userAllergies = allergies
      .split(",")
      .map((allergy) => allergy.trim().toLowerCase());
    const matchedAllergies = userAllergies.filter((allergy) =>
      ingredients.includes(allergy)
    );

    if (matchedAllergies.length > 0) {
      Alert.alert(
        "Warning!",
        `This food is not safe for you due to: ${matchedAllergies.join(", ")}`
      );
    } else {
      Alert.alert("Safe!", "This food is safe for you.");
    }
  };

  return (
    <View style={styles.scrollContainer}>
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
    </View>
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
    borderRadius: 8
  },
});
