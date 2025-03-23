import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type CategoryProps = {
  name: string;
  image: string;
};

export default function Category({ name, image }: CategoryProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginHorizontal: 10 },
  image: { width: 70, height: 70, borderRadius: 35, marginBottom: 5 },
  name: { fontSize: 14, fontWeight: "bold" },
});
