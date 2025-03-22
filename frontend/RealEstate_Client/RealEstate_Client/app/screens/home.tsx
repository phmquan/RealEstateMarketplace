import React from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import Category from "../components/category";
import PostSmall from "../components/postSmall";
import SearchBar from "../components/searchBar";

export default function HomeScreen() {
  const categories = Array(5).fill({
    name: "Danh mục",
    image: "https://via.placeholder.com/70",
  });
  const posts = Array(10).fill({
    image: "https://via.placeholder.com/100",
    details: "Tên bài",
    price: "100.000.000 VND",
    location: "Thủ Đức",
  });

  return (
    <View style={styles.container}>
      {/* --------------- Search Bar --------------- */}
      <SearchBar/>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        
        {/* -------------- Categories Section -------------- */}
        <Text style={styles.sectionTitle}>Khám phá danh mục</Text>
        <ScrollView horizontal style={styles.horizontalScroll}>
          {categories.map((category, index) => (
            <Category key={index} name={category.name} image={category.image} />
          ))}
        </ScrollView>

        {/* ---------------- PostsSection ---------------- */}
        <Text style={styles.sectionTitle}>Bài đăng gần đây</Text>
        {posts.map((post, index) => (
          <PostSmall
            key={index}
            image={post.image}
            details={post.details}
            price={post.price}
            location={post.location}
          />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentContainer: {
    paddingTop: 20, // Leaves space for the orange bar
    paddingHorizontal: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  horizontalScroll: { marginBottom: 30 },
});
