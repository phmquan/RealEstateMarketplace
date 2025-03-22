import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import SearchBar from "./components/searchBar";
import PostMedium from "./components/postMedium";

export default function BrowsePosts() {
  const posts = Array(10).fill({
    avatar: "https://via.placeholder.com/40",
    username: "User",
    time: "2 ngày trước",
    image: "https://via.placeholder.com/300",
    details: "Tên bài",
    price: "100.000.000 VND",
    location: "Thủ Đức"
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar />

      {/* Posts */}
      <ScrollView contentContainerStyle={styles.postsContainer}>
        {posts.map((post, index) => (
          <PostMedium
            key={index}
            avatar={post.avatar}
            username={post.username}
            time={post.time}
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
  postsContainer: { padding: 15 },
});
