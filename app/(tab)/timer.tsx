import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Modal,
  TextInput,
} from "react-native";
import { theme } from "../styles/variable";
import { useState } from "react";
import { useFonts, YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { B612Mono_400Regular } from "@expo-google-fonts/b612-mono";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Timer() {
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerTimeSettingVisible, setTimerTimeSettingVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
    KaushanScript_400Regular,
    B612Mono_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleTimerTimeSettingVisible = () => {
    setTimerTimeSettingVisible(!timerTimeSettingVisible);
  };

  const handleTimerExecution = () => {
    setIsRunning(!isRunning);
  };

  const handleTimerReset = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={timerTimeSettingVisible}
        onRequestClose={handleTimerTimeSettingVisible}
      >
        <View style={styles.timerTimeSettingContainer}>
          <View style={styles.timerTimeSettingTextInputContainer}>
            <TextInput
              style={styles.timerTimeSettingTextInput}
              keyboardType="number-pad"
              onChangeText={(newText) => {
                const newMinutes = Number(newText);
                if (newMinutes > 99) {
                  setTimerMinutes(99);
                  return;
                }
                setTimerMinutes(newMinutes);
              }}
              autoFocus={true}
            />
          </View>
          <Pressable
            style={styles.timerTimeSettingApplyBtn}
            onPress={handleTimerTimeSettingVisible}
          >
            <Text style={styles.timerTimerSettingApplyBtnText}>Done!</Text>
          </Pressable>
        </View>
      </Modal>
      <Pressable
        style={styles.timerTimeSettingBtn}
        onPress={handleTimerTimeSettingVisible}
      >
        <MaterialIcons name="timer" size={40} color={theme.$white} />
      </Pressable>
      <Text style={styles.title}>Timer</Text>
      <View style={styles.timerContainer}>
        <Pressable
          onPress={handleTimerTimeSettingVisible}
          style={styles.timerDisplayContainer}
        >
          <Text style={styles.timerDisplayTextNumFont}>
            {timerMinutes < 10 ? `0${timerMinutes}` : `${timerMinutes}`}
          </Text>
          <Text style={styles.timerDisplayText}> : </Text>
          <Text style={styles.timerDisplayTextNumFont}>
            {timerSeconds < 10 ? `0${timerSeconds}` : `${timerSeconds}`}
          </Text>
        </Pressable>
        <View style={styles.timerControlBtnsContainer}>
          <Pressable
            style={({ pressed }) =>
              isRunning
                ? [
                    styles.timerControlBtns,
                    styles.timerStopBtn,
                    { opacity: pressed ? 0.7 : 1 },
                  ]
                : [
                    styles.timerControlBtns,
                    styles.timerStartBtn,
                    { opacity: pressed ? 0.7 : 1 },
                  ]
            }
            onPress={handleTimerExecution}
          >
            {isRunning ? (
              <Text style={styles.timerControlBtnsText}>정지</Text>
            ) : (
              <Text style={styles.timerControlBtnsText}>시작</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.timerControlBtns,
              styles.timerResetBtn,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleTimerReset}
          >
            <Text style={styles.timerControlBtnsText}>초기화</Text>
          </Pressable>
        </View>
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
  timerTimeSettingContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: 310,
    height: 310,
    backgroundColor: theme.$white,
    borderRadius: 30,
    borderBottomWidth: 2,
    borderBottomColor: theme.$black,
    borderRightWidth: 4,
    borderRightColor: theme.$black,
  },
  timerTimeSettingTextInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    borderBottomWidth: 2,
    borderBottomColor: theme.$gray,
  },
  timerTimeSettingTextInput: {
    fontSize: 36,
    color: theme.$darkGray,
    fontFamily: "B612Mono_400Regular",
    width: "100%",
    textAlign: "center",
  },
  timerTimeSettingText: {
    fontSize: 36,
    color: theme.$darkGray,
  },
  timerTimeSettingBtn: {
    position: "absolute",
    top: 50,
    right: 10,
    padding: 10,
  },
  timerTimeSettingApplyBtn: {
    position: "absolute",
    bottom: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  timerTimerSettingApplyBtnText: {
    fontSize: 24,
    color: theme.$darkGray,
  },
  title: {
    fontSize: 32,
    color: theme.$primary,
    marginTop: 40,
    fontFamily: "KaushanScript_400Regular",
    paddingHorizontal: 5,
  },
  timerContainer: {
    gap: 20,
    marginTop: "30%",
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
    fontSize: 22,
    fontFamily: "YeonSung_400Regular",
  },
});
