import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFonts, YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { useState } from "react";
import { theme } from "@/styles/variables";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { todoListStorage } from "@/store/store";
import uuid from "react-native-uuid";

interface ITodoList {
  id: string;
  task: string;
}

export default function TodoList() {
  const [addTaskInputValue, setAddTaskInputValue] = useState("");
  const [tasks, setTasks] = useState<ITodoList[]>(() => {
    return JSON.parse(todoListStorage.getString("tasks") ?? "[]");
  });

  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
    KaushanScript_400Regular,
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

  const handleRemoveTask = (taskToRemove: ITodoList) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskToRemove.id);
    setTasks(updatedTasks);

    todoListStorage.set("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
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
      <View style={styles.renderTaskContainer}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.renderTaskBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => handleRemoveTask(item)}
            >
              <Text style={styles.renderTaskText}>{item.task}</Text>
            </Pressable>
          )}
          contentContainerStyle={styles.renderTaskList}
        />
      </View>
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
  renderTaskContainer: {
    flex: 1,
    marginTop: 80,
    width: "80%",
  },
  renderTaskList: {
    gap: 20,
  },
  renderTaskBtn: {
    backgroundColor: theme.$primary,
    padding: 10,
    borderRadius: 10,
  },
  renderTaskText: {
    fontSize: 20,
    color: theme.$black,
    fontFamily: "YeonSung_400Regular",
  },
});
