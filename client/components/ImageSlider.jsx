import { View, Image, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";

export default function ImageSlider() {
  const width = Dimensions.get("window").width;

  const imageData = [
    {
      img: "https://static.vecteezy.com/system/resources/previews/046/845/964/non_2x/scientist-check-chemical-food-residues-in-laboratory-control-experts-inspect-quality-of-fruits-vegetables-lab-hazards-rohs-find-prohibited-substances-contaminate-microscope-microbiologist-photo.jpg",
    },
    {
      img: "https://img.freepik.com/premium-vector/food-allergy-action-month-horizontal-banner-theme-health-nutrition-problems_703715-511.jpg",
    },
    {
      img: "https://www.indialawoffices.com/images/subcategory/911717504977.png",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={imageData}
        scrollAnimationDuration={1000}
        parallaxScrollingScale={0.8}
        parallaxScrollingOffset={100}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              width: 375,
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 15 }}
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
}
