import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type PostProps = {
  image: string;
  details: string;
  price: string;
  location: string;
};

export default function Post({ image, details, price, location }: PostProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.details}>{details}</Text>
        <Text style={styles.price}>Giá: {price}</Text>
        <Text style={styles.location}>Địa điểm: {location}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  textContainer: { flex: 1 },
  details: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  price: { color: "green", marginBottom: 5 },
  location: { color: "gray" },
});
