import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import Header from "../../components/Header";
import ImageSlider from "../../components/ImageSlider";
import featureImage1 from "../../assets/images/feature1.jpg";
import featureImage2 from "../../assets/images/feature2.png";
import featureImage3 from "../../assets/images/feature3.jpeg";
import featureImage4 from "../../assets/images/feature4.jpg";
import key_features from "../../assets/images/key_features.png";
import core_values from "../../assets/images/core_values.png";
import { Ionicons } from "@expo/vector-icons";

const featureImages = [
  {
    id: "1",
    uri: featureImage1,
    title: "Scan Food",
  },
  {
    id: "2",
    uri: featureImage2,
    title: "Ingredient Analyzer",
  },
  {
    id: "3",
    uri: featureImage3,
    title: "Allergy Tracker",
  },
  {
    id: "4",
    uri: featureImage4,
    title: "Import URL",
  },
];

const data = [
  {
    id: "1",
    title: "Generate Report",
    subtitle: "Nutrientation",
    color: "#4cb3d0",
    icon: "document",
  },
  {
    id: "2",
    title: "Crop Analyzer",
    subtitle: "Farm report",
    color: "#f792a8",
    icon: "medkit",
  },
  {
    id: "3",
    title: "Voice Activated Assistant",
    subtitle: "Multi-linguistic Approach",
    color: "#f4b266",
    icon: "mic-circle",
  },
];

export default function Home() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <Header />
      </View>

      <View style={styles.slider_container}>
        <ImageSlider />
      </View>

      <View style={styles.feature_cont}>
        <View style={styles.sectionTitleContainer}>
          <Image source={key_features} style={styles.key_features_img} />
          <Text style={styles.sectionTitle}>Key Features</Text>
        </View>
        <View style={styles.feature_container}>
          {featureImages.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={ZoomIn.duration(800).delay(index * 300)}
              style={styles.feature_item}
            >
              <TouchableOpacity style={styles.feature_img}>
                <Image style={styles.feature_image} source={item.uri} />
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.sectionTitleContainer}>
          <Image source={core_values} style={styles.key_features_img} />
          <Text style={styles.sectionTitle}>Core Capabilities</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Animated.View
              key={item.id}
              entering={ZoomIn.duration(800).delay(index * 300)}
              style={[styles.card, { backgroundColor: item.color }]}
            >
              <TouchableOpacity style={styles.cardContent}>
                {/* Adding FontAwesome icon */}
                <Ionicons
                  name={item.icon}
                  size={30}
                  color="#fff"
                  style={styles.cardIcon}
                />
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.flatlistContainer}
          showsHorizontalScrollIndicator={false}
        />
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
  slider_container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitleContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#4cb3d0",
    fontFamily: "Montserrat-bold"
  },
  sectionTileSlider: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    fontFamily: "Montserrat-medium"
  },
  key_features_img: {
    width: 35,
    height: 35,
  },
  feature_cont: {
    margin: 20,
  },
  feature_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 40,
  },
  feature_item: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    width: 155,
  },
  feature_img: {
    width: 160,
    height: 180,
    display: "flex",
    alignItems: "center",
    borderRadius: 15,
    position: "relative",
  },
  feature_image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  overlayTextContainer: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-medium"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    paddingBottom: 50,
  },
  flatlistContainer: {
    paddingVertical: 10,
  },
  card: {
    width: 150,
    height: 200,
    borderRadius: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Montserrat-medium",
    marginBottom: 10,
    marginTop: 15,
    textAlign: "center",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});
