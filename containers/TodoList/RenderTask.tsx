import { theme } from "@/styles/variables";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { setData } from "@/store/store";
import { TodoListProps, Tasks } from "./types";
import { useFonts } from "expo-font";
import { Jua_400Regular } from "@expo-google-fonts/jua";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { FlashList } from "@shopify/flash-list";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function RenderTask({ tasks, setTasks }: TodoListProps) {
  const [fontsLoaded, fontsError] = useFonts({
    Jua_400Regular,
  });

  const [tasksAllCompleted, setTasksAllCompleted] = useState(false);
  const [confettiPlayed, setConfettiPlayed] = useState(false);
  const [confettiIsPlaying, setConfettiIsPlaying] = useState(false);

  const confettiRef = useRef<LottieView>(null);

  const hasTasksLeft = tasks.length > 0;

  useEffect(() => {
    const checkAllTasksCompleted = tasks.every((_task) => _task.isCompleted);

    if (checkAllTasksCompleted && hasTasksLeft && !confettiPlayed) {
      confettiRef.current?.play(0);
      setConfettiIsPlaying(true);
      setConfettiPlayed(true);
    }

    if (!checkAllTasksCompleted) {
      setConfettiPlayed(false);
    }

    setTasksAllCompleted(checkAllTasksCompleted);
  }, [tasks, hasTasksLeft, confettiPlayed]);

  useEffect(() => {
    // Confetti fails to play on restart with all tasks done, so initialize confettiIsPlaying on mount.
    setConfettiIsPlaying(false);
  }, []);

  const handleConfettiAniFinished = () => {
    setConfettiIsPlaying(false);
  };

  const handleTaskCompletionSwitch = (taskToToggle: Tasks) => {
    const updatedTasks = tasks.map((_task) =>
      _task.id === taskToToggle.id ? { ..._task, isCompleted: !taskToToggle.isCompleted } : _task
    );
    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  const handleRemoveTask = (taskToRemove: Tasks) => {
    const updatedTasks = tasks.filter((_task) => _task.id !== taskToRemove.id);
    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  const handleMenuSwitch = (taskToOpenMenu: Tasks) => {
    setTasks(
      tasks.map((_task) => (_task.id === taskToOpenMenu.id ? { ..._task, isMenuOpen: !taskToOpenMenu.isMenuOpen } : _task))
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
          : _task
      )
    );
  };

  const handleInputChangeToEditTask = (newText: string, taskToEdit: Tasks) => {
    setTasks(tasks.map((_task) => (_task.id === taskToEdit.id ? { ..._task, inputValueToEdit: newText } : _task)));
  };

  const handleApproveEditingTask = (taskToEdit: Tasks) => {
    if (!taskToEdit.inputValueToEdit.trim()) return;

    const updatedTasks = tasks.map((_task) =>
      _task.id === taskToEdit.id ? { ..._task, title: taskToEdit.inputValueToEdit, isEditing: false } : _task
    );

    setTasks(updatedTasks);

    setData("tasks", JSON.stringify(updatedTasks));
  };

  const handleCancelEditingTask = (taskToCancel: Tasks) => {
    setTasks(tasks.map((_task) => (_task.id === taskToCancel.id ? { ..._task, isEditing: false } : _task)));
  };

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <>
      <LottieView
        ref={confettiRef}
        source={require("@/assets/animations/confetti.json")}
        autoPlay={false}
        loop={false}
        style={[
          styles.confetti,
          {
            zIndex: confettiIsPlaying === true ? 1000 : -1,
            elevation: confettiIsPlaying === true ? 1000 : -1,
          },
        ]}
        resizeMode="cover"
        onAnimationFinish={handleConfettiAniFinished}
      />
      <View style={styles.renderTaskListWrapper}>
        {!hasTasksLeft && (
          <View style={styles.emptyTaskContainer}>
            <Image source={require("@/assets/images/no-task.png")} style={styles.emptyTaskImg} />
            <Text style={styles.emptyTaskTitle}>Waiting to kick off...</Text>
          </View>
        )}
        <FlashList
          data={tasks}
          keyExtractor={(_task) => _task.id}
          renderItem={({ item: _task }) => (
            <View style={styles.renderTaskWrapper}>
              <Pressable
                style={({ pressed }) => [
                  styles.renderTaskBtn,
                  _task.isCompleted && { opacity: _task.isCompleted && 0.5 },
                  pressed && { opacity: 0.4 },
                ]}
                onPress={() => handleTaskCompletionSwitch(_task)}
              >
                <View style={styles.renderTask}>
                  {_task.isCompleted ? (
                    <Text>
                      <Feather name="check-square" size={24} color="black" />
                    </Text>
                  ) : (
                    <Text>
                      <Feather name="square" size={24} color="black" />
                    </Text>
                  )}
                  {_task.isEditing ? (
                    <>
                      <TextInput
                        style={styles.inputToEditTaskText}
                        onChangeText={(newText) => handleInputChangeToEditTask(newText, _task)}
                        defaultValue={_task.title}
                      />
                      <View style={styles.editTaskMenu}>
                        <Pressable
                          style={styles.editTaskBtns}
                          onPress={() => {
                            handleApproveEditingTask(_task);
                          }}
                        >
                          <Ionicons name="checkmark-sharp" size={28} color="black" />
                        </Pressable>
                        <Pressable style={styles.editTaskBtns} onPress={() => handleCancelEditingTask(_task)}>
                          <Ionicons name="close-sharp" size={28} color="black" />
                        </Pressable>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text style={styles.renderTaskText}>{_task.title}</Text>
                      {_task.isMenuOpen ? (
                        <View style={styles.renderTaskMenu}>
                          <Pressable onPress={() => handleMenuSwitch(_task)} style={styles.renderTaskMenuSwitch}>
                            <Feather name="chevrons-up" size={28} color="black" />
                          </Pressable>
                          <Pressable style={styles.renderTaskMenuBtns} onPress={() => handleOpenEditingTask(_task)}>
                            <Feather name="edit" size={28} color="black" />
                          </Pressable>
                          <Pressable style={styles.renderTaskMenuBtns} onPress={() => handleRemoveTask(_task)}>
                            <AntDesign name="delete" size={28} color="black" />
                          </Pressable>
                        </View>
                      ) : (
                        <Pressable onPress={() => handleMenuSwitch(_task)} style={styles.renderTaskMenuSwitch}>
                          <Feather name="chevrons-down" size={28} color="black" />
                        </Pressable>
                      )}
                    </>
                  )}
                </View>
              </Pressable>
            </View>
          )}
          estimatedItemSize={50}
          ListFooterComponent={
            <>
              {tasksAllCompleted && hasTasksLeft ? (
                <View style={styles.WIPImgContainer}>
                  <Image source={require("@/assets/images/task-done.png")} style={styles.WIPImg} />
                  <Text style={styles.WIPImgTitle}>You nailed it!</Text>
                </View>
              ) : (
                <></>
              )}
              {!tasksAllCompleted && hasTasksLeft ? (
                <View style={styles.WIPImgContainer}>
                  <Image source={require("@/assets/images/fire.png")} style={styles.WIPImg} />
                  <Text style={styles.WIPImgTitle}>Let's roll!</Text>
                </View>
              ) : (
                <></>
              )}
            </>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  renderTaskListWrapper: {
    flex: 1,
    marginTop: 80,
    width: "80%",
    height: "100%",
  },
  emptyTaskContainer: {
    opacity: 0.4,
    alignItems: "center",
    gap: 20,
  },
  emptyTaskImg: {
    marginLeft: 30,
    width: 100,
    height: 100,
  },
  emptyTaskTitle: {
    color: theme.$white,
    fontFamily: "Jua_400Regular",
    fontSize: 19,
  },
  renderTaskWrapper: {
    marginBottom: 20,
  },
  renderTaskBtn: {
    backgroundColor: theme.$primary,
    paddingLeft: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  renderTask: {
    flexDirection: "row",
    gap: 15,
  },
  inputToEditTaskText: {
    borderBottomWidth: 1,
    borderBottomColor: theme.$darkGray,
    fontFamily: "Jua_400Regular",
    fontSize: 16,
    color: theme.$darkGray,
    flex: 1,
  },
  editTaskMenu: {
    flexDirection: "row",
    marginRight: 5,
  },
  editTaskBtns: {
    paddingHorizontal: 5,
  },
  renderTaskText: {
    fontSize: 19,
    color: theme.$darkGray,
    fontFamily: "Jua_400Regular",
    lineHeight: 24,
    flex: 1,
  },
  WIPImgContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: "center",
    opacity: 0.4,
    gap: 10,
  },
  WIPImg: {
    width: 100,
    height: 100,
  },
  WIPImgTitle: {
    color: theme.$white,
    fontSize: 19,
    fontFamily: "Jua_400Regular",
  },
  renderTaskMenuSwitch: {
    paddingHorizontal: 10,
    height: 28,
  },
  renderTaskMenu: {
    alignItems: "center",
    gap: 15,
  },
  renderTaskMenuBtns: {
    paddingHorizontal: 10,
  },
  renderTaskMenuText: {
    fontFamily: "Jua_400Regular",
  },
  confetti: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
