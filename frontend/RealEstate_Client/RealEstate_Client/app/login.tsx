import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const API_URL = 'http://10.0.2.2:8080/api'; // For Android Emulator
// const API_URL = 'http://localhost:8080/api'; // For web testing
// const API_URL = 'http://YOUR_IP:8080/api'; // For physical device

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '782671983095-bdr70g1c0gh2ce5chuelf1cpttke0m4r.apps.googleusercontent.com', 
    clientId: '782671983095-bdr70g1c0gh2ce5chuelf1cpttke0m4r.apps.googleusercontent.com',
  });

  const handleAuth = async () => {
    try {
      if (isLogin) {
        // Handle login
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
        
        if (response.data.token) {
          // Save token and navigate to home
          router.replace('/');
        }
      } else {
        // Handle registration
        if (!fullName || !email || !password) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
        }

        const response = await axios.post(`${API_URL}/auth/register`, {
          fullName,
          email,
          password,
        });

        if (response.data.success) {
          Alert.alert('Success', 'Registration successful! Please login.');
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.error('Error details:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'An error occurred'
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success' && result.authentication) {
        // Send token to your backend
        const response = await axios.post(`${API_URL}/auth/google`, {
          token: result.authentication.accessToken,
        });
        
        if (response.data.token) {
          // Save token and navigate to home
          router.replace('/');
        }
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Google sign in failed'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Đăng nhập" : "Đăng ký tài khoản"}</Text>
      {!isLogin && (
        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      )}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.googleButtonText}>Đăng nhập với Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Đăng ký tài khoản mới" : "Đăng nhập ngay"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  googleButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  googleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  switchText: { marginTop: 15, color: "blue" },
});