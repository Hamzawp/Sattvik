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
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UploadImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [isPacked, setIsPacked] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [isAnalyzedClicked, setIsAnalyzeClicked] = useState(false);

  const packedImageUrl =
    "https://c8.alamy.com/comp/BBRP29/ingredients-list-from-lotion-showing-the-ingredient-ethylenediaminetetraacetic-BBRP29.jpg";
  const looseImageUrl =
    "https://assets.bonappetit.com/photos/58a37e2309ffa8f718634793/master/w_1600%2Cc_limit/tangelo-citrus.jpg";

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setResponse(null); // Clear previous response when a new image is selected
    }
  };

  const analyzeImage = () => {
    setIsAnalyzeClicked(true);
    setIsLoading(true);

    // Simulate analysis response
    setTimeout(() => {
      const mockReport = {
        result: isPacked
          ? "The Product is Not Recommended due to UNSAFE Ingredients."
          : "The Product is 70% unadulterated.",
        unsafe_ingredients: isPacked
          ? {
              "potassium sorbate":
                "Potassium sorbate is the potassium salt of sorbic acid, chemical formula CH3CH=CH−CH=CH−CO2K. It is primarily used as a food preservative (E number 202).",
              "sodium benzoate":
                "Sodium benzoate is widely used as a food preservative (E211) and a pickling agent.",
            }
          : null,
      };
      setResponse(mockReport);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <Header />
      <View style={styles.uploadWindow}>
        <View style={styles.toggleContainer}>
          <Text style={styles.heading}>Upload an Image</Text>
          <View style={styles.toggleBar}>
            <Text>{isPacked ? "Packed" : "Loose"}</Text>
            <Switch
              value={isPacked}
              onValueChange={() => {
                setIsPacked(!isPacked);
                setResponse(null); // Reset response on switch
                setSelectedImage(null); // Clear selected image on switch
              }}
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
          <Image
            source={{
              uri: selectedImage || (isPacked ? packedImageUrl : looseImageUrl),
            }}
            style={styles.image}
          />
        </View>

        <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
          <Text style={styles.buttonText}>Choose Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.analyzeImageBtn} onPress={analyzeImage}>
          <Text style={styles.buttonText}>Analyze Image</Text>
        </TouchableOpacity>

        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loadingGif}
          />
        )}

        {response && response.result ? (
          <View style={styles.reportContainer}>
            <Text style={styles.reportHeading}>Product Report</Text>
            {response.unsafe_ingredients &&
              Object.entries(response.unsafe_ingredients).map(
                ([name, description], index) => (
                  <View key={index} style={styles.reportItem}>
                    <Ionicons
                      name="alert-circle"
                      size={20}
                      color="red"
                      style={styles.bulletIcon}
                    />
                    <Text style={styles.reportText}>
                      {name} - {description}
                    </Text>
                  </View>
                )
              )}
            <Text style={styles.conclusionText}>{response.result}</Text>
          </View>
        ) : (
          <View style={styles.notfoundContainer}>
            <Text style={styles.notfound}>No Ingredients Found!</Text>
          </View>
        )}
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 80,
    backgroundColor: "#ecf2f3",
  },
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
    width: "100%", 
    justifyContent: "center", 
    alignItems: "center", 
  },
  notfound: {
    color: "red",
    padding: 20,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
    fontFamily: 'Montserrat-bold',
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Montserrat-bold',
  },
  toggleBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  tooltip: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    color: "#666",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderRadius: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Montserrat-medium',
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
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat-bold',
  },
  loadingGif: {
    marginVertical: 20,
  },
  reportContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  reportHeading: {
    fontSize: 18,
    fontFamily: 'Montserrat-bold',
    marginBottom: 20,
  },
  reportItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: 'center',
    marginBottom: 5,
  },
  bulletIcon: {
    marginRight: 15,
  },
  reportText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'justify',
    width: '88%'
  },
  conclusionText: {
    fontFamily: 'Montserrat-bold',
    color: '#45b3cb',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    fontFamily: 'Montserrat',
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'Montserrat',
  },
  closeModalButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
