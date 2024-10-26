import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Anticons from "react-native-vector-icons/AntDesign";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function productdetail() {
  const router = useRouter();

  // Sample content to replace `item`
  const sampleData = {
    img: "https://www.quickpantry.in/cdn/shop/files/balaji-wafers-simply-salted-quick-pantry-2.png?v=1710538876&width=460", // Add your actual image URL
    company_name: "Balaji Wafers",
    fssai_approved: true,
    product_name: "Balaji Wafers - Classic Salted",
    ingredients: ["Potato", "Palm Oil", "Salt", "Antioxidant (INS 330)"],
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: sampleData.img }}
          contentFit="cover"
          style={styles.image}
        />
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        <Anticons name="closecircle" size={36} color="#45b3cb" />
      </TouchableOpacity>

      {/* details */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={styles.title}
        >
          {sampleData.product_name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(100).duration(300).springify()}
          style={styles.detailText}
        >
          Company: <Text style={styles.boldText}>{sampleData.company_name}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(300).springify()}
          style={styles.detailText}
        >
          FSSAI Approved:{" "}
          <Text style={styles.boldText}>
            {sampleData.fssai_approved ? "Yes" : "No"}
          </Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(300).springify()}
          style={styles.instructionTitle}
        >
          Ingredients
        </Animated.Text>

        {sampleData.ingredients.map((ingredient, index) => (
          <Animated.Text
            entering={FadeInDown.delay((index + 5) * 100).duration(300).springify()}
            key={ingredient}
            style={styles.ingredientText}
          >
            {ingredient}
          </Animated.Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: "white",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  image: {
    width: "100%",
    height: 400,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 10,
  },
  scrollView: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#45b3cb",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 8,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginVertical: 16,
  },
  ingredientText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 4,
  },
};
