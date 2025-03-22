import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/home";
import ManagePosts from "../screens/managePosts";
import NewPost from "../screens/newPost";
import BrowsePosts from "../screens/browsePosts";
import Account from "../screens/account";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Quản lý tin" component={ManagePosts} />
      <Tab.Screen name="Đăng tin" component={NewPost} />
      <Tab.Screen name="Dạo chợ" component={BrowsePosts} />
      <Tab.Screen name="Tài khoản" component={Account} />
    </Tab.Navigator>
  );
}
