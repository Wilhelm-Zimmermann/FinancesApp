import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { BillProvider } from "@/contexts/BillsContext/BillContext";
import { BillTypeProvider } from "@/contexts/BillTypeContext/BillTypeContext";

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <BillProvider>
      <BillTypeProvider>
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
              title: "Início",
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
            name="bills"
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
            name="user"
            options={{
              title: "Perfil",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={18}
                  name={focused ? "person" : "person-outline"}
                />
              ),
              tabBarLabelStyle: {
                fontSize: 11,
              },
            }}
          />
        </Tabs>
      </BillTypeProvider>
    </BillProvider>
  );
}
