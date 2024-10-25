import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";

export default function UploadImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);

  const pickImage = async (source) => {
    let result;

    // Request permission to access media library or camera based on source
    if (source === "library") {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access the camera roll is required!");
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access the camera is required!");
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setIsLoading(false);
    setReport(null);
  };

  const analyzeImage = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Mock report data
      const mockReport = {
        items: [
          { name: "Pesticide Residue", quantity: "5 mg", safe: false },
          { name: "Preservative E210", quantity: "2 mg", safe: true },
          { name: "Artificial Dye E123", quantity: "3 mg", safe: false },
        ],
        conclusion: "This product is adulterated",
      };
      setReport(mockReport);
      setIsLoading(false);
    }, 3000); // Simulate loading time
  };

  return (
    <View>
      <Header />
      <View style={styles.uploadwindow}>
        <Text style={styles.heading}>Upload an Image</Text>
        <Text style={styles.subtitle}>
          Take a picture or upload an image of your food item
        </Text>

        <View style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage }} style={styles.image} />
              <TouchableOpacity style={styles.removeImageIcon} onPress={removeImage}>
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.placeholderText}>No Image Selected</Text>
          )}
        </View>

        {!selectedImage ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => pickImage("library")}>
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => pickImage("camera")}>
              <Text style={styles.buttonText}>Use Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.analyzeImageBtn} onPress={analyzeImage}>
            <Text style={styles.buttonText}>Analyze Image</Text>
          </TouchableOpacity>
        )}

        {isLoading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingGif} />}

        {report && (
          <View style={styles.reportContainer}>
            <Text style={styles.reportHeading}>Product Report</Text>
            {report.items.map((item, index) => (
              <View key={index} style={styles.reportItem}>
                <Ionicons
                  name={item.safe ? "checkmark-circle" : "alert-circle"}
                  size={20}
                  color={item.safe ? "green" : "red"}
                  style={styles.bulletIcon}
                />
                <Text style={styles.reportText}>
                  {item.name} - {item.quantity}
                </Text>
              </View>
            ))}
            <Text style={styles.conclusionText}>{report.conclusion}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadwindow: {
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeImageIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  placeholderText: {
    color: "#aaa",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "rgb(76 112 222)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  analyzeImageBtn: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingGif: {
    marginVertical: 20,
  },
  reportContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  reportHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reportItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bulletIcon: {
    marginRight: 5,
  },
  reportText: {
    fontSize: 16,
  },
  conclusionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    textAlign:"center",
  },
});
