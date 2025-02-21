import { theme } from "@/styles/variables";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { todoListStorage } from "@/store/store";
import { useFonts } from "expo-font";
import { YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import { TodoListProps, Tasks } from "./types";

export default function RenderTask({ tasks, setTasks }: TodoListProps) {
  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleRemoveTask = (taskToRemove: Tasks) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskToRemove.id);
    setTasks(updatedTasks);

    todoListStorage.set("tasks", JSON.stringify(updatedTasks));
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
