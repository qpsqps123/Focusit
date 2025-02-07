import { Text, View, StyleSheet } from "react-native";

export default function TodoList() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#69247c",
    alignItems: "center",
  },
  title: { fontSize: 24, color: "#FAC67A", marginTop: 30, }
})
