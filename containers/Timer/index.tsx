import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import ControlTimer from "./ControlTimer";
import SetTimeModal from "./SetTimeModal";
import { theme } from "@/styles/variables";
import { useRef, useState } from "react";
import { useFonts } from "expo-font";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { MaterialIcons } from "@expo/vector-icons";

export default function Timer() {
  const [fontsLoaded, fontsError] = useFonts({
    KaushanScript_400Regular,
  });

  const [timerMinutes, setTimerMinutes] = useState(50);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initMinutes, setInitMinutes] = useState(50);
  const [timerTimeSettingVisible, setTimerTimeSettingVisible] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const intervelRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimerTimeSettingVisible = () => {
    if (isRunning) return;
    if (timerMinutes !== initMinutes && timerSeconds !== 0) return;

    setTimerTimeSettingVisible(!timerTimeSettingVisible);
  };

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SetTimeModal
        timerTimeSettingVisible={timerTimeSettingVisible}
        initMinutes={initMinutes}
        setInitMinutes={setInitMinutes}
        setTimerMinutes={setTimerMinutes}
        handleTimerTimeSettingVisible={handleTimerTimeSettingVisible}
      />
      <Pressable style={styles.timerTimeSettingBtn} onPress={handleTimerTimeSettingVisible}>
        <MaterialIcons name="timer" size={35} color={theme.$white} />
      </Pressable>
      <Text style={styles.title}>Timer</Text>
      <ControlTimer
        startTimeRef={startTimeRef}
        pausedTimeRef={pausedTimeRef}
        intervelRef={intervelRef}
        isRunning={isRunning}
        initMinutes={initMinutes}
        timerMinutes={timerMinutes}
        timerSeconds={timerSeconds}
        setIsRunning={setIsRunning}
        setTimerMinutes={setTimerMinutes}
        setTimerSeconds={setTimerSeconds}
        handleTimerTimeSettingVisible={handleTimerTimeSettingVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.$background,
    alignItems: "center",
  },
  timerTimeSettingBtn: {
    position: "absolute",
    top: 50,
    right: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
    color: theme.$primary,
    marginTop: 40,
    fontFamily: "KaushanScript_400Regular",
    paddingHorizontal: 5,
  },
});
