import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Header from "../../components/Header";

export default function SearchByImg() {
  const [imageLink, setImageLink] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const sipJellyIngredients = {
      ingredients: [
        "Water",
        "Sugar",
        "Sodium Citrate",
        "Citric Acid",
        "Artificial Pineapple Flavor",
        "Coloring (E102, E110)",
      ],
      isSafe: true,
    };

    setResult(sipJellyIngredients);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <Header />
      </View>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
          }}
          style={styles.ImportImg}
        />
        <Text style={styles.title}>Search by URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter image link"
          value={imageLink}
          onChangeText={setImageLink}
        />
        <TouchableOpacity style={styles.analyzeBtn} onPress={handleSearch}>
          <Text style={styles.analyzeBtnText}>Analyze Url</Text>
        </TouchableOpacity>

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Ingredients:</Text>
            {result.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.resultContent}>
                {ingredient}
              </Text>
            ))}
            <Text style={styles.safetyStatus}>
              {result.isSafe
                ? "This product is safe."
                : "This product is not safe."}
            </Text>
          </View>
        )}
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
  resultContainer: {
    marginTop: 30,
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-medium",
    marginBottom: 20,
  },
  resultContent: {
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  safetyStatus: {
    marginTop: 20,
    fontFamily: "Montserrat-bold",
    textTransform: "uppercase",
    fontSize: 20,
    color: "green",
  },
  ImportImg: {
    width: "100%",
    height: 300,
    marginBottom: 30,
    borderRadius: 8,
  },
});
