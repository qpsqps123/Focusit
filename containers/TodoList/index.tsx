import { SafeAreaView, StyleSheet, Text } from "react-native";
import AddTask from "./AddTask";
import RenderTask from "./RenderTask";
import { theme } from "@/styles/variables";
import { useEffect, useState } from "react";
import { Tasks } from "./types";
import { getData } from "@/store/store";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function TodoList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const [fontsLoaded, fontsError] = useFonts({
    KaushanScript_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  useEffect(() => {
    getData("tasks").then((value) => setTasks(JSON.parse(value ?? "[]")));
  }, []);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <AddTask tasks={tasks} setTasks={setTasks} />
      <RenderTask tasks={tasks} setTasks={setTasks} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.$background,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: theme.$primary,
    marginTop: 40,
    fontFamily: "KaushanScript_400Regular",
    paddingHorizontal: 5,
  },
});
