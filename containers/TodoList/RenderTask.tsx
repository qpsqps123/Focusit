import { theme } from "@/styles/variables";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { setData } from "@/store/store";
import { TodoListProps, Tasks } from "./types";
import { useFonts } from "expo-font";
import { Jua_400Regular } from "@expo-google-fonts/jua";

export default function RenderTask({ tasks, setTasks }: TodoListProps) {
  const [fontsLoaded, fontsError] = useFonts({
    Jua_400Regular,
  });

  const handleRemoveTask = (taskToRemove: Tasks) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskToRemove.id);
    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  if (!fontsLoaded && !fontsError) {
    return null;
  }

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
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },
  renderTaskText: {
    fontSize: 19,
    color: theme.$darkGray,
    fontFamily: "Jua_400Regular",
    lineHeight: 25,
  },
});
