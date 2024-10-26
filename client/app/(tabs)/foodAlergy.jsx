import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
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
    <View>
      <View>
        <Header />
      </View>
      <View style={{ margin: 20 }}>
        <Text style={{ marginBottom: 10 }}>
          Enter your allergies (comma separated):
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
            paddingHorizontal: 10,
          }}
          onChangeText={setAllergies}
          value={allergies}
          placeholder="e.g., peanuts, shellfish"
        />
        <Button title="Check Allergies" onPress={checkAllergies} />
      </View>
    </View>
  );
}
