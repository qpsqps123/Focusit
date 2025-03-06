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
    const updatedTasks = tasks.filter((item) => item.id !== taskToRemove.id);
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.renderTaskContainer}>
            <Pressable
              style={({ pressed }) => [
                styles.renderTaskBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.renderTask}>
                <Text style={styles.renderTaskText}>{item.task}</Text>
                <Pressable
                  onPress={() => handleMenuSwitch(item.id)}
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
            {openedTaskMenuIds.includes(item.id) && (
              <View style={styles.renderTaskMenu}>
                <Pressable style={styles.renderTaskMenuBtns}>
                  <Text style={styles.renderTaskMenuText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.renderTaskMenuBtns}
                  onPress={() => handleRemoveTask(item)}
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
  },
  renderTaskContainer: {
    position: "relative",
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
    zIndex: 3,
  },
  renderTaskMenuBtns: {
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
  renderTaskMenuText: {
    fontFamily: "Jua_400Regular",
  },
});
