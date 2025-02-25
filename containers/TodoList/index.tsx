import { SafeAreaView, StyleSheet, Text } from "react-native";
import AddTask from "./AddTask";
import RenderTask from "./RenderTask";
import { theme } from "@/styles/variables";
import { todoListStorage } from "@/store/store";
import { useState } from "react";
import { Tasks } from "./types";

export default function TodoList() {
  const [tasks, setTasks] = useState<Tasks[]>(() => {
    return JSON.parse(todoListStorage.getString("tasks") ?? "[]");
  });
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
