import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm..."
        style={styles.searchBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "orange",
    padding: 15,
  },
  searchBar: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "black",
  },
});
