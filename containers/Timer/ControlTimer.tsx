import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/styles/variables";
import { useFonts } from "@expo-google-fonts/yeon-sung";
import { Jua_400Regular } from "@expo-google-fonts/jua";
import { B612Mono_400Regular } from "@expo-google-fonts/b612-mono";
import { ControlTimerProps } from "./types";
import { useEffect } from "react";

export default function ControlTimer({
  startTimeRef,
  pausedTimeRef,
  intervelRef,
  isRunning,
  initMinutes,
  timerMinutes,
  timerSeconds,
  setIsRunning,
  setTimerMinutes,
  setTimerSeconds,
  handleTimerTimeSettingVisible,
}: ControlTimerProps) {
  const [fontsLoaded, fontsError] = useFonts({
    B612Mono_400Regular,
    Jua_400Regular,
  });

  const updateTimer = () => {
    if (startTimeRef.current === null) return;
    const elapsed = Date.now() - startTimeRef.current;
    const totalSeconds = Math.ceil(elapsed / 1000);
    const minutes = Math.ceil(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    setTimerMinutes(initMinutes - minutes);
    setTimerSeconds(60 - seconds);
  };

  useEffect(() => {
    // Check if the timer has reached 0
    if (timerMinutes < 0) {
      setIsRunning(false);
      setTimerMinutes(initMinutes);
      setTimerSeconds(0);
      startTimeRef.current = null;
      if (intervelRef.current) {
        clearInterval(intervelRef.current);
        intervelRef.current = null;
      }
    }
  }, [initMinutes, timerMinutes, timerSeconds, setIsRunning, setTimerMinutes, setTimerSeconds, intervelRef, startTimeRef]);

  const handleTimerExecution = () => {
    setIsRunning(true);

    if (startTimeRef.current === null) {
      // When the timer is started for the first time
      startTimeRef.current = Date.now();
    } else if (pausedTimeRef.current !== null) {
      // When the timer is resumed after being paused, assign the elapsed time of pausedTimeRef to startTimeRef.
      startTimeRef.current = Date.now() - pausedTimeRef.current;
    }

    if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }
    intervelRef.current = setInterval(updateTimer, 100);
  };

  const handleTimerStop = () => {
    setIsRunning(false);

    if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }

    if (startTimeRef.current !== null) {
      // When the timer is paused, assign the elapsed time to pausedTimeRef.
      pausedTimeRef.current = Date.now() - startTimeRef.current;
    }
  };

  const handleTimerReset = () => {
    setIsRunning(false);
    setTimerMinutes(initMinutes);
    setTimerSeconds(0);
    startTimeRef.current = null;
    if (intervelRef.current) {
      clearInterval(intervelRef.current);
      intervelRef.current = null;
    }
  };

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <View style={styles.timerContainer}>
      <Pressable onPress={handleTimerTimeSettingVisible} style={styles.timerDisplayContainer}>
        <Text style={styles.timerDisplayTextNumFont}>{timerMinutes < 10 ? `0${timerMinutes}` : `${timerMinutes}`}</Text>
        <Text style={styles.timerDisplayText}> : </Text>
        <Text style={styles.timerDisplayTextNumFont}>
          {timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds === 60 ? "00" : `${timerSeconds}`}
        </Text>
      </Pressable>
      <View style={styles.timerControlBtnsContainer}>
        {isRunning ? (
          <Pressable
            style={({ pressed }) => [styles.timerControlBtns, styles.timerStopBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={handleTimerStop}
          >
            <Text style={styles.timerControlBtnsText}>Stop</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.timerControlBtns, styles.timerStartBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={handleTimerExecution}
          >
            <Text style={styles.timerControlBtnsText}>Start</Text>
          </Pressable>
        )}
        <Pressable
          style={({ pressed }) => [styles.timerControlBtns, styles.timerResetBtn, { opacity: pressed ? 0.7 : 1 }]}
          onPress={handleTimerReset}
        >
          <Text style={styles.timerControlBtnsText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    gap: 20,
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 300,
    height: 150,
  },
  timerDisplayContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  timerDisplayText: {
    fontSize: 72,
    color: theme.$primary,
  },
  timerDisplayTextNumFont: {
    fontSize: 72,
    color: theme.$primary,
    fontFamily: "B612Mono_400Regular",
  },
  timerControlBtnsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    width: "100%",
  },
  timerControlBtns: {
    justifyContent: "center",
    alignItems: "center",
    width: "35%",
    height: 45,
    borderRadius: 10,
  },
  timerStartBtn: {
    backgroundColor: theme.$primary,
  },
  timerStopBtn: {
    backgroundColor: theme.$red,
  },
  timerResetBtn: {
    backgroundColor: theme.$white,
  },
  timerControlBtnsText: {
    fontSize: 19,
    color: theme.$darkGray,
    fontFamily: "Jua_400Regular",
  },
});
