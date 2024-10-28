import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Header from "../../components/Header";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../configs/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function UploadImg() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null); // State to hold result
  const [unsafeIngredients, setUnsafeIngredients] = useState(null); // State to hold unsafe ingredients

  const onImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const onAddProduct = async () => {
    if (!image) {
      console.warn("No image selected");
      return;
    }

    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";

    try {
      const resp = await fetch(image);
      const blob = await resp.blob();

      const imageRef = ref(storage, "Sattvik/" + fileName);

      await uploadBytes(imageRef, blob)
        .then(async () => {
          console.log("File uploaded");
          const downloadUrl = await getDownloadURL(imageRef);
          await saveProductDetail(downloadUrl);
        })
        .catch((error) => {
          console.error("Error during upload or getting download URL:", error);
        });
    } catch (error) {
      console.error("Error fetching or uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveProductDetail = async (imageUrl) => {
    await setDoc(doc(db, "IngredientDetectorImage", Date.now().toString()), {
      imageUrl: imageUrl,
    });

    // Call the endpoint after saving the product detail
    fetchSimilarity(imageUrl);
  };

  const fetchSimilarity = async (imageUrl) => {
    try {
      const response = await fetch("http://10.0.2.2:5000/process-packedimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: imageUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
        setUnsafeIngredients(data.unsafe_ingredients);
        ToastAndroid.show("New Product Added!", ToastAndroid.BOTTOM);
      } else {
        console.error("Failed to fetch similarity:", response.status);
      }
    } catch (error) {
      console.error("Error calling the endpoint:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <Header />
      <View style={styles.uploadWindow}>
        <View style={styles.toggleContainer}>
          <Text style={styles.heading}>Upload an Image</Text>
        </View>

        <Text style={styles.subtitle}>
          Take a picture or upload an image of your food item
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => onImagePick()}>
          {!image ? (
            <Image
              source={require("../../assets/images/placeholder.png")}
              style={{
                width: 300,
                height: 200,
              }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 300,
                height: 200,
                borderRadius: 15,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 20, marginTop: 30 }}>
        <TouchableOpacity
          disabled={loading}
          style={styles.analyzeImageBtn}
          onPress={() => onAddProduct()}
        >
          {loading ? (
            <ActivityIndicator color={"#fff"} size={"large"} />
          ) : (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontFamily: "Montserrat-bold",
                fontSize: 16,
              }}
            >
              Analyze Image
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {result && ( // Display result if available
        <View style={styles.similarityContainer}>
          <Text style={styles.similarityText}>{result}</Text>
          {unsafeIngredients && Object.keys(unsafeIngredients).length > 0 && (
            <Text style={styles.similarityText}>
              Unsafe Ingredients: {Object.keys(unsafeIngredients).join(", ")}
            </Text>
          )}
        </View>
      )}
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
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontFamily: "Montserrat-bold",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "Montserrat-medium",
  },
  imageContainer: {
    width: 370,
    height: 250,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
    marginHorizontal: 20,
  },
  analyzeImageBtn: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  similarityContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  similarityText: {
    fontSize: 18,
    fontFamily: "Montserrat-bold",
    color: "#333",
    textAlign: "center", 
  },
});
