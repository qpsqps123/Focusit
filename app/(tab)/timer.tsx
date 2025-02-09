import { Text, View, StyleSheet } from "react-native";
import { useFonts, YeonSung_400Regular } from '@expo-google-fonts/yeon-sung';

export default function Timer() {
  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
  });

 if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#69247c",
    alignItems: "center",
  },
  title: { fontSize: 24, color: "#FAC67A", marginTop: 80, fontFamily: "YeonSung_400Regular" }
})
