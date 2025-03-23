import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type PostProps = {
    avatar: string;
    username: string;
    time: string;
    image: string;
    details: string;
    price: string;
    location: string;
  };

export default function PostMedium({ avatar, username, time, image, details, price, location }: PostProps) {
  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {/* Post Content */}
      <Image source={{ uri: image }} style={styles.postImage} />
      <Text style={styles.details}>{details}</Text>
      <Text style={styles.price}>Giá: {price}</Text>
      <Text style={styles.location}>Địa điểm: {location}</Text>

      {/* Interactions */}
      <View style={styles.interactions}>
        <TouchableOpacity>
          <Text style={styles.interactionText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.interactionText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.interactionText}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 3,
  },
  userInfo: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { fontSize: 16, fontWeight: "bold" },
  time: { fontSize: 12, color: "gray" },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  details: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  price: { fontSize: 16, fontWeight: "bold", color: "green", marginBottom: 5 },
  location: { fontSize: 14, color: "gray", marginBottom: 10 },
  interactions: { flexDirection: "row", justifyContent: "space-between" },
  interactionText: { fontSize: 14, fontWeight: "bold", color: "blue" },
});
