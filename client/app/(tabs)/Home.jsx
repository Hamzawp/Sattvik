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
import Animated, { FadeIn, FadeInDown, ZoomIn } from "react-native-reanimated"; // Import animations
import Header from "../../components/Header";
import FontAwesome from "react-native-vector-icons/FontAwesome"; 

import featureImage1 from "../../assets/images/feature1.jpg";
import featureImage2 from "../../assets/images/feature2.png";
import featureImage3 from "../../assets/images/feature3.jpeg";
import featureImage4 from "../../assets/images/feature4.jpg";

import bannerImage1 from "../../assets/images/banner1.jpeg";
import bannerImage2 from "../../assets/images/banner2.jpg";
import bannerImage3 from "../../assets/images/banner1.jpeg";
import bannerImage4 from "../../assets/images/banner1.jpeg";

const images = [
  {
    id: "1",
    uri: bannerImage2,
  },
  {
    id: "2",
    uri: bannerImage1,
  },
  {
    id: "3",
    uri: bannerImage3,
  },
  {
    id: "4",
    uri: bannerImage4,
  },
];

const featureImages = [
  {
    id: "1",
    uri: featureImage1, // Local image
  },
  {
    id: "2",
    uri: featureImage2, // Local image
  },
  {
    id: "3",
    uri: featureImage3, // Local image
  },
  {
    id: "4",
    uri: featureImage4, // Local image
  },
];

const data = [
  {
    id: "1",
    title: "Konsultasi",
    subtitle: "89 dokter",
    color: "#4cb3d0",
    icon: "stethoscope",
  },
  {
    id: "2",
    title: "Apotek",
    subtitle: "6 Apotek terdekat",
    color: "#f792a8",
    icon: "medkit",
  },
  {
    id: "3",
    title: "Rumah Sakit",
    subtitle: "6 RS terdekat",
    color: "#f4b266",
    icon: "hospital-o",
  },
];

export default function Home() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <View>
        <Header />
      </View>

      <View style={styles.slider_container}>
        <Text style={styles.sectionTileSlider}>Hey there! 👏</Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            marginBottom: 20,
            color: "#333",
          }}
        >
          How you doing?{" "}
        </Text>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <Animated.View
              entering={FadeIn.duration(600).delay(parseInt(item.id) * 200)}
              style={styles.image_slider_item}
            >
              <Image
                style={styles.image_slider_image}
                source={item.uri}
              />
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>

      <View style={styles.feature_cont}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.feature_container}>
          {featureImages.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={ZoomIn.duration(800).delay(index * 300)}
              style={styles.feature_item}
            >
              <TouchableOpacity style={styles.feature_img}>
                <Image
                  style={styles.feature_image}
                  source={item.uri} 
                />
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>Feature {item.id}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      <View style={styles.container}>
      <Text style={styles.sectionTitle}>Features</Text>
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
                <FontAwesome
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
  sectionTitle: {
    fontSize: 21,
    marginTop: 20,
    marginBottom: 15,
    fontWeight: "600",
  },
  sectionTileSlider: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "400",
  },
  image_slider_item: {
    width: 300,
    height: 200,
    marginRight: 10,
  },
  image_slider_image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  feature_cont: {
    margin: 20,
    paddingBottom: 50,
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
    left: "25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
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
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#fff",
  },
});
