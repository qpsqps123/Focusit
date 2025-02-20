import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { todoListStorage } from "@/store/store";
import { theme } from "@/styles/variables";
import uuid from "react-native-uuid";
import { FontAwesome6 } from "@expo/vector-icons";
import { useFonts, YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import { IProps } from "./types";

export default function AddTask({ tasks, setTasks }: IProps) {
  const [addTaskInputValue, setAddTaskInputValue] = useState("");

  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddTaskInputChange = (newText: string) => {
    setAddTaskInputValue(() => newText);
  };

  const handleAddTask = () => {
    if (!addTaskInputValue.trim()) return;

    const newTask = { id: uuid.v4(), task: addTaskInputValue };
    const updatedTasks = [...tasks, newTask];

    todoListStorage.set("tasks", JSON.stringify(updatedTasks));

    setTasks(updatedTasks);
    setAddTaskInputValue("");
  };

  return (
    <View style={styles.todoInputContainer}>
      <TextInput
        style={styles.addTaskInput}
        onChangeText={handleAddTaskInputChange}
        defaultValue={addTaskInputValue}
        placeholderTextColor="rgba(255, 255, 255, 0.4)"
        placeholder="Add a task!"
      />
      <Pressable
        style={styles.addTaskPressableContainer}
        onPress={handleAddTask}
      >
        <FontAwesome6 name="plus" size={40} color={theme.$white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  todoInputContainer: {
    marginTop: 50,
    flexDirection: "row",
  },
  addTaskInput: {
    color: theme.$primary,
    fontSize: 24,
    width: 220,
    height: 50,
    fontFamily: "YeonSung_400Regular",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  addTaskPressableContainer: {
    marginLeft: 20,
  },
  addTaskImage: {
    width: 50,
    height: 50,
  },
});
