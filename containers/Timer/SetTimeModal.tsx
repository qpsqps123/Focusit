import { theme } from "@/styles/variables";
import { useFonts, YeonSung_400Regular } from "@expo-google-fonts/yeon-sung";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SetTimeModalProps, TimerProps } from "./types";

export default function SetTimeModal({
  timerTimeSettingVisible,
  initMinutes,
  setInitMinutes,
  setTimerMinutes,
  handleTimerTimeSettingVisible,
}: SetTimeModalProps) {
  let [fontsLoaded] = useFonts({
    YeonSung_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
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
            defaultValue={String(initMinutes)}
            onChangeText={(newText) => {
              setInitMinutes(Number(newText));

              if (Number(newText) > 99) {
                setInitMinutes(99);
                setTimerMinutes(99);
                return;
              } else {
                setTimerMinutes(Number(newText));
              }
            }}
            autoFocus={true}
          />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.timerTimeSettingApplyBtn,
            {
              borderRightWidth: pressed ? 1 : 2,
              borderBottomWidth: pressed ? 1 : 2,
            },
          ]}
          onPress={handleTimerTimeSettingVisible}
        >
          <Text style={styles.timerTimeSettingApplyBtnText}>Done!</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  timerTimeSettingContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: 310,
    height: 310,
    backgroundColor: theme.$white,
    borderRadius: 30,
    borderBottomWidth: 4,
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
    fontFamily: "YeonSung_400Regular",
    width: "100%",
    textAlign: "center",
  },
  timerTimeSettingText: {
    fontSize: 36,
    color: theme.$darkGray,
  },
  timerTimeSettingApplyBtn: {
    position: "absolute",
    bottom: 30,
    paddingTop: 17,
    paddingLeft: 25,
    paddingRight: 18,
    paddingBottom: 13,
    borderColor: theme.$gray,
    borderRadius: 25,
    backgroundColor: "#f2f2f2",
  },
  timerTimeSettingApplyBtnText: {
    fontSize: 22,
    color: theme.$darkGray,
    fontFamily: "YeonSung_400Regular",
  },
});
