import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "782671983095-bdr70g1c0gh2ce5chuelf1cpttke0m4r.apps.googleusercontent.com", // Thay bằng Web Client ID của bạn
});

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Thông báo", `Số điện thoại: ${phone}\nMật khẩu: ${password}`);
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Alert.alert("Đăng nhập thành công", `Chào ${userInfo.user.name}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể đăng nhập bằng Google");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        placeholder="Nhập số điện thoại"
      />
      <Text style={styles.label}>Mật khẩu</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Nhập mật khẩu"
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
      <GoogleSigninButton style={styles.googleButton} onPress={signInWithGoogle} />
      <Text style={styles.registerText}>
        Chưa có tài khoản? <Text style={styles.registerLink}>Đăng ký tài khoản mới</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: { fontSize: 32, fontWeight: "bold", color: "#FFA500", marginBottom: 20 },
  label: { alignSelf: "flex-start", fontSize: 16, marginBottom: 5 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  forgotPassword: { color: "blue", marginBottom: 20 },
  loginButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  orText: { marginVertical: 15, fontSize: 16 },
  googleButton: { width: 192, height: 48 },
  registerText: { marginTop: 20, fontSize: 16 },
  registerLink: { color: "blue", fontWeight: "bold" },
});

export default LoginScreen;
