import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}</Text>
      {!isLogin && <TextInput placeholder="Họ và tên" style={styles.input} />}
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Mật khẩu" style={styles.input} secureTextEntry />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>{isLogin ? "Đăng ký tài khoản mới" : "Đăng nhập ngay"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "gray", borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 },
  button: { width: "100%", height: 50, backgroundColor: "orange", justifyContent: "center", alignItems: "center", borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
  googleButton: { width: 192, height: 48, marginTop: 10 },
  switchText: { marginTop: 15, color: "blue" },
});