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

  const handleSearch = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/process-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageLink }),
      });

      const data = await response.json();
      console.log(data);

      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult({ result: "Error fetching data", unsafe_ingredients: {} });
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
            {/* Display the main result message */}
            <Text style={styles.resultTitle}>Result:</Text>
            <Text style={styles.resultContent}>{result.result}</Text>

            {/* Display unsafe ingredients, if any */}
            {result.unsafe_ingredients &&
              Object.keys(result.unsafe_ingredients).length > 0 && (
                <View style={styles.unsafeIngredientsContainer}>
                  <Text style={styles.resultTitle}>Unsafe Ingredients:</Text>
                  {Object.entries(result.unsafe_ingredients).map(
                    ([ingredient, description], index) => (
                      <View key={index} style={styles.ingredientContainer}>
                        <Text style={styles.ingredientName}>
                          • {ingredient}
                        </Text>
                        <Text style={styles.ingredientDescription}>
                          {description}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              )}
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
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-medium",
    marginBottom: 20,
    marginTop: 20,
  },
  resultContent: {
    fontFamily: "Montserrat",
    fontSize: 15,
  },
  ImportImg: {
    width: "100%",
    height: 300,
    marginBottom: 30,
    borderRadius: 8,
  },
  unsafeIngredientsContainer: {
    marginTop: 20,
  },
  ingredientContainer: {
    marginBottom: 15,
  },
  ingredientName: {
    fontSize: 18,
    fontFamily: "Montserrat-medium",
    color: "red",
    marginBottom: 10,
  },
  ingredientDescription: {
    fontSize: 14,
    color: "black",
    marginLeft: 10,
    fontFamily: "Montserrat",
  },
});
