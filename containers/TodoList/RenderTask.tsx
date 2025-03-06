import { theme } from "@/styles/variables";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { setData } from "@/store/store";
import { TodoListProps, Tasks } from "./types";
import { useFonts } from "expo-font";
import { Jua_400Regular } from "@expo-google-fonts/jua";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";

export default function RenderTask({ tasks, setTasks }: TodoListProps) {
  const [openedTaskMenuIds, setOpenedTaskMenuIds] = useState<Array<String>>([]);

  const [fontsLoaded, fontsError] = useFonts({
    Jua_400Regular,
  });

  const handleRemoveTask = (taskToRemove: Tasks) => {
    const updatedTasks = tasks.filter(
      (taskElement) => taskElement.id !== taskToRemove.id,
    );
    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  const handleMenuSwitch = (taskId: string) => {
    if (openedTaskMenuIds.includes(taskId)) {
      const filteredIds = openedTaskMenuIds.filter(
        (openedTaskMenuId) => openedTaskMenuId !== taskId,
      );
      setOpenedTaskMenuIds(filteredIds);
    } else {
      setOpenedTaskMenuIds([...openedTaskMenuIds, taskId]);
    }
  };

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View style={styles.renderTaskWrapper}>
      <FlatList
        data={tasks}
        keyExtractor={(taskElement) => taskElement.id}
        renderItem={({ item: taskElement }) => (
          <View>
            <Pressable
              style={({ pressed }) => [
                styles.renderTaskBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.renderTask}>
                <Text style={styles.renderTaskText}>{taskElement.task}</Text>
                <Pressable
                  onPress={() => handleMenuSwitch(taskElement.id)}
                  style={styles.renderTaskMenuSwitch}
                >
                  <MaterialCommunityIcons
                    name="menu-down"
                    size={28}
                    color="black"
                  />
                </Pressable>
              </View>
            </Pressable>
            {openedTaskMenuIds.includes(taskElement.id) && (
              <View style={styles.renderTaskMenu}>
                <Pressable style={styles.renderTaskMenuBtns}>
                  <Text style={styles.renderTaskMenuText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.renderTaskMenuBtns}
                  onPress={() => handleRemoveTask(taskElement)}
                >
                  <Text style={styles.renderTaskMenuText}>Delete</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={styles.renderTaskList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  renderTaskWrapper: {
    flex: 1,
    marginTop: 80,
    width: "80%",
  },
  renderTaskList: {
    gap: 20,
    height: "100%",
  },
  renderTaskBtn: {
    backgroundColor: theme.$primary,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },
  renderTask: {
    flexDirection: "row",
    gap: 5,
  },
  renderTaskText: {
    fontSize: 19,
    color: theme.$darkGray,
    fontFamily: "Jua_400Regular",
    lineHeight: 25,
    flex: 1,
  },
  renderTaskMenuSwitch: {
    width: 28,
    height: 28,
  },
  renderTaskMenu: {
    backgroundColor: theme.$white,
    borderRadius: 10,
    position: "absolute",
    top: 50,
    right: 0,
    zIndex: 10,
    elevation: 10,
  },
  renderTaskMenuBtns: {
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  renderTaskMenuText: {
    fontFamily: "Jua_400Regular",
  },
});
