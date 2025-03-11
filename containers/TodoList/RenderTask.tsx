import { theme } from "@/styles/variables";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { setData } from "@/store/store";
import { TodoListProps, Tasks } from "./types";
import { useFonts } from "expo-font";
import { Jua_400Regular } from "@expo-google-fonts/jua";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export default function RenderTask({ tasks, setTasks }: TodoListProps) {
  const [fontsLoaded, fontsError] = useFonts({
    Jua_400Regular,
  });

  const handleRemoveTask = (taskToRemove: Tasks) => {
    const updatedTasks = tasks.filter((_task) => _task.id !== taskToRemove.id);
    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  const handleMenuSwitch = (taskToOpenMenu: Tasks) => {
    setTasks(
      tasks.map((_task) =>
        _task.id === taskToOpenMenu.id
          ? { ..._task, isMenuOpen: !taskToOpenMenu.isMenuOpen }
          : _task,
      ),
    );
  };

  const handleOpenEditingTask = (taskToEdit: Tasks) => {
    setTasks(
      tasks.map((_task) =>
        _task.id === taskToEdit.id
          ? {
              ..._task,
              inputValueToEdit: taskToEdit.title,
              isMenuOpen: false,
              isEditing: true,
            }
          : _task,
      ),
    );
  };

  const handleInputChangeToEditTask = (newText: string, taskToEdit: Tasks) => {
    setTasks(
      tasks.map((_task) =>
        _task.id === taskToEdit.id
          ? { ..._task, inputValueToEdit: newText }
          : _task,
      ),
    );
  };

  const handleApproveEditingTask = (taskToEdit: Tasks) => {
    if (!taskToEdit.inputValueToEdit.trim()) return;

    const updatedTasks = tasks.map((_task) =>
      _task.id === taskToEdit.id
        ? { ..._task, title: taskToEdit.inputValueToEdit, isEditing: false }
        : _task,
    );

    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  const handleCancelEditingTask = (taskToCancel: Tasks) => {
    setTasks(
      tasks.map((_task) =>
        _task.id === taskToCancel.id ? { ..._task, isEditing: false } : _task,
      ),
    );
  };

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View style={styles.renderTaskWrapper}>
      <FlatList
        data={tasks}
        keyExtractor={(_task) => _task.id}
        renderItem={({ item: _task }) => (
          <View>
            <Pressable
              style={({ pressed }) => [
                styles.renderTaskBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.renderTask}>
                {/* {!taskCompleted ? ( */}
                {/*   <Text> */}
                {/*     <Feather name="check-square" size={20} color="black" /> */}
                {/*   </Text> */}
                {/* ) : ( */}
                <Text>
                  <Feather name="square" size={20} color="black" />
                </Text>
                {/* )} */}
                {_task.isEditing ? (
                  <>
                    <TextInput
                      style={styles.inputToEditTaskText}
                      onChangeText={(newText) =>
                        handleInputChangeToEditTask(newText, _task)
                      }
                      defaultValue={_task.title}
                    />

                    <Pressable
                      style={styles.btnToApproveEditingTaskText}
                      onPress={() => {
                        handleApproveEditingTask(_task);
                      }}
                    >
                      <Ionicons
                        name="checkmark-sharp"
                        size={28}
                        color="black"
                      />
                    </Pressable>
                    <Pressable
                      style={styles.btnToCancelEditingTaskText}
                      onPress={() => handleCancelEditingTask(_task)}
                    >
                      <Ionicons name="close" size={28} color="black" />
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Text style={styles.renderTaskText}>{_task.title}</Text>
                    <Pressable
                      onPress={() => handleMenuSwitch(_task)}
                      style={styles.renderTaskMenuSwitch}
                    >
                      <MaterialCommunityIcons
                        name="menu-down"
                        size={28}
                        color="black"
                      />
                    </Pressable>
                  </>
                )}
              </View>
            </Pressable>
            {_task.isMenuOpen && (
              <View style={styles.renderTaskMenu}>
                <Pressable
                  style={styles.renderTaskMenuBtns}
                  onPress={() => handleOpenEditingTask(_task)}
                >
                  <Text style={styles.renderTaskMenuText}>Edit</Text>
                </Pressable>
                <Pressable
                  style={styles.renderTaskMenuBtns}
                  onPress={() => handleRemoveTask(_task)}
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
  renderTaskBtn: {
    backgroundColor: theme.$primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  renderTask: {
    flexDirection: "row",
    gap: 15,
    alignItems: "baseline",
  },
  inputToEditTaskText: {
    borderBottomWidth: 1,
    borderBottomColor: theme.$darkGray,
    fontFamily: "Jua_400Regular",
    fontSize: 16,
    color: theme.$darkGray,
    flex: 1,
  },
  btnToApproveEditingTaskText: {
    width: 28,
    height: 28,
  },
  btnToCancelEditingTaskText: {
    width: 28,
    height: 28,
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
