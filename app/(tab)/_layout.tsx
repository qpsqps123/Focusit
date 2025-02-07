import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return <Tabs screenOptions={{
    tabBarActiveTintColor: "#FAC67A",
    tabBarInactiveTintColor: "#aaa",
    headerStyle: {
      backgroundColor: '#69247c',
    },
    headerShown: false,
    headerTintColor: '#FAC67A',
    tabBarStyle: {
      backgroundColor: '#69247c',
      borderBlockColor: '#69247c',
    },
  }}>
    <Tabs.Screen name="index" options={{ title: "TodoList", tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'reader-sharp' : 'reader-outline'} color={color} size={24} />) }} />
    <Tabs.Screen name="timer" options={{ title: "Timer", tabBarIcon: ({ color, focused }) => (<Ionicons name={focused ? 'timer-sharp' : 'timer-outline'} color={color} size={24} />) }} />
  </Tabs>;
}
