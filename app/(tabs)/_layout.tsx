import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons size={18} name={focused ? "home" : "home-outline"} />
          ),
          tabBarLabelStyle: {
            fontSize: 11,
          },
        }}
      />
      <Tabs.Screen
        name="(bill)"
        options={{
          title: "Contas",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={18}
              name={focused ? "newspaper" : "newspaper-outline"}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 11,
          },
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused }) => (
            <Ionicons size={18} name={focused ? "person" : "person-outline"} />
          ),
          tabBarLabelStyle: {
            fontSize: 11,
          },
        }}
      />
    </Tabs>
  );
}
