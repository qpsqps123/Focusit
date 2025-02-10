import { Text, View, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { useFonts, YeonSung_400Regular } from '@expo-google-fonts/yeon-sung';
import { KaushanScript_400Regular} from '@expo-google-fonts/kaushan-script';
import { Image } from "expo-image";
import { useState } from "react";
import { theme } from "../styles/variable";
const AddImage = require("@/assets/images/add.png")

export default function TodoList() {
  const [addTaskInputValue, setAddTaskInputValue] = useState('')

  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
    KaushanScript_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handlePress = () => {
    console.log(123)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
      <View style={styles.todoInputContainer}>
        <TextInput style={styles.addTaskInput} onChangeText={(newText)=>setAddTaskInputValue(newText)} defaultValue={addTaskInputValue} placeholder="Add a task!"/>
        <Pressable style={styles.addTaskPressableContainer} onPress={handlePress}><Image style={styles.addTaskImage} source={AddImage} /></Pressable>
      </View>
      <View style={styles.renderTaskContainer}><Text style={styles.renderTaskList}>List1aslkjdfkljsangdljnsklgdnaskljfglkajsnfgkjanskldjnkljsdnaksdgnlk</Text><Text style={styles.renderTaskList}>List2</Text><Text style={styles.renderTaskList}>List3</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.$background,
    alignItems: "center",
  },
  title: { fontSize: 24, color: theme.$primary, marginTop: 80, fontFamily: "KaushanScript_400Regular" },
  todoInputContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  addTaskInput: {
    color: theme.$primary,
    fontSize: 20,
    width: 200,
    height: 40,
    fontFamily: "YeonSung_400Regular"
  },
  addTaskPressableContainer: {
    marginLeft: 10,
  },
  addTaskImage: {
    width: 40,
    height: 40,
  },
  renderTaskContainer: {
    marginTop: 30,
    width: '80%',
    gap: 20,
  },
  renderTaskList: {
    color: "aaa",
    fontSize: 20,
    fontFamily: "YeonSung_400Regular",
    backgroundColor: theme.$primary,
    padding: 10,
    borderRadius: 10
  }
})
