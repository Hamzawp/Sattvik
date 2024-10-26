import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Modal,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, storage } from "../../configs/FirebaseConfig"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions
import { doc, setDoc } from "firebase/firestore";

export default function UploadImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [isPacked, setIsPacked] = useState(true); // Toggle state
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [response, setResponse] = useState(null);
  const [isAnalyzedClicked, setIsAnalyzeClicked] = useState(false);

  useEffect(() => {
    const checkFirstVisit = async () => {
      const firstVisit = await AsyncStorage.getItem("firstVisit");
      if (!firstVisit) {
        setShowTooltip(true);
        await AsyncStorage.setItem("firstVisit", "false");
      }
    };
    checkFirstVisit();
  }, []);

  const pickImage = async (source) => {
    let result;
    if (source === "library") {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
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

    // Check if the user cancelled the image selection
    if (result.canceled) {
      return;
    }

    setSelectedImage(result.assets[0].uri); // Set the selected image URI
    uploadImage(result.assets[0].uri); // Call upload function
  };
  const saveProductDetail = async (imageUrl) => {
    await setDoc(doc(db, "ProductList", Date.now().toString()), {
      imageUrl: imageUrl,
    });

    // setLoading(false);
    ToastAndroid.show("New Product Added!", ToastAndroid.BOTTOM);
  };

  const uploadImage = async (uri) => {
    try {
        console.log("Uploading image from URI:", uri);

        const response = await fetch(uri);
        const blob = await response.blob();
        console.log("res: ", response)
        console.log("blob: ",blob);
        const fileName = uri.split('/').pop(); // Define fileName here
        console.log("FilenameL:", fileName)
        const imageRef = ref(storage, "MumbaiHacks/" + fileName);
        console.log("imageRef:", imageRef)

        const snapshot = await uploadBytes(imageRef, blob);
        console.log("File uploaded", snapshot);

        const downloadUrl = await getDownloadURL(snapshot.ref);
        console.log("File available at", downloadUrl);

        await saveProductDetail(downloadUrl); // Save the product details with the download URL
    } catch (error) {
        console.error("Upload failed:", error); // Log any errors
    }
};



  const removeImage = () => {
    setSelectedImage(null);
    setIsLoading(false);
    setReport(null);
  };

  const analyzeImage = () => {
    setIsAnalyzeClicked(true);
    setIsLoading(true);
    setTimeout(() => {
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
      <View style={styles.uploadWindow}>
        <View style={styles.toggleContainer}>
          <Text style={styles.heading}>Upload an Image</Text>
          <View style={styles.toggleBar}>
            <Text>{isPacked ? "Packed" : "Loose"}</Text>
            <Switch
              value={isPacked}
              onValueChange={() => setIsPacked(!isPacked)}
              trackColor={{ false: "#ccc", true: "#45b3cb" }}
              thumbColor={isPacked ? "#fff" : "#fff"}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="information-circle" size={24} color="#45b3cb" />
            </TouchableOpacity>
          </View>
        </View>

        {showTooltip && (
          <Text style={styles.tooltip}>
            Select the mode of product: Packed or Loose
          </Text>
        )}

        <Text style={styles.subtitle}>
          Take a picture or upload an image of your food item
        </Text>

        <View style={styles.imageContainer}>
          {selectedImage ? (
            <>
              <Image source={{ uri: selectedImage }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeImageIcon}
                onPress={removeImage}
              >
                <Ionicons name="close-circle" size={24} color="red" />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.placeholderText}>No Image Selected</Text>
          )}
        </View>

        {!selectedImage ? (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                pickImage("library");
                setIsAnalyzeClicked(false);
              }}
            >
              <Text style={styles.buttonText}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                pickImage("camera");
                setIsAnalyzeClicked(false);
              }}
            >
              <Text style={styles.buttonText}>Use Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.analyzeImageBtn}
            onPress={analyzeImage}
          >
            <Text style={styles.buttonText}>Analyze Image</Text>
          </TouchableOpacity>
        )}

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingGif}
          />
        )}

        {response && response.status === 200 ? (
          report && (
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
          )
        ) : (
          isAnalyzedClicked && (
            <View style={styles.notfoundContainer}>
              <Text style={styles.notfound}>No Ingredients Found!</Text>
            </View>
          )
        )}
      </View>

      {/* Modal for showing product type information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Your product is {isPacked ? "Packed" : "Loose"}.{"\n"}
              {"\n"} If you select "Packed," the analysis will be based on the
              packaging. For "Loose," ensure that the image clearly shows the
              product.
            </Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  uploadWindow: {
    padding: 20,
  },
  notfoundContainer: {
    marginTop: 10,
    backgroundColor: "#f2eded",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
    height: 250,
    width: "100%", // Optional: Set a width for the notfound container
    justifyContent: "center", // Center text vertically
    alignItems: "center", // Center text horizontally
  },
  notfound: {
    color: "red",
    padding: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  tooltip: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
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
    backgroundColor: "#45b3cb",
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
    fontWeight: "bold",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeModalButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
