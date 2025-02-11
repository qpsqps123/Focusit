import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useFonts, YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { Image } from "expo-image";
import { useState } from "react";
import { theme } from "../styles/variable";
const AddImage = require("@/assets/images/add.png");

export default function TodoList() {
  const [addTaskInputValue, setAddTaskInputValue] = useState("");

  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
    KaushanScript_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.todoInputContainer}>
        <TextInput
          style={styles.addTaskInput}
          onChangeText={(newText) => setAddTaskInputValue(newText)}
          defaultValue={addTaskInputValue}
          placeholder="Add a task!"
        />
        <Pressable
          style={styles.addTaskPressableContainer}
          onPress={handlePress}
        >
          <Image style={styles.addTaskImage} source={AddImage} />
        </Pressable>
      </View>
      <View style={styles.renderTaskContainer}>
        <Text style={styles.renderTaskList}>List1</Text>
        <Text style={styles.renderTaskList}>List2</Text>
        <Text style={styles.renderTaskList}>List3</Text>
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
    marginLeft: 10,
  },
  addTaskImage: {
    width: 50,
    height: 50,
  },
  renderTaskContainer: {
    marginTop: 40,
    width: "80%",
    gap: 20,
  },
  renderTaskList: {
    color: theme.$black,
    fontSize: 20,
    fontFamily: "YeonSung_400Regular",
    backgroundColor: theme.$primary,
    padding: 10,
    borderRadius: 10,
  },
});
