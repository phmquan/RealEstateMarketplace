import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "782671983095-bdr70g1c0gh2ce5chuelf1cpttke0m4r.apps.googleusercontent.com",
});

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Hoặc đăng nhập bằng</Text>
      <GoogleSigninButton onPress={handleGoogleSignIn} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Chưa có tài khoản? <Text style={styles.registerLink}>Đăng ký tài khoản mới</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "orange", marginBottom: 20 },
  input: { width: "80%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  forgotPassword: { color: "blue", marginBottom: 20 },
  button: { backgroundColor: "orange", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  orText: { marginVertical: 10 },
  registerText: { marginTop: 20 },
  registerLink: { color: "blue", fontWeight: "bold" },
});

export default LoginScreen;