import { Dispatch, SetStateAction } from "react";
import { GestureResponderEvent } from "react-native";

export type TimerProps = {
  isRunning: boolean;
  timerTimeSettingVisible: boolean;
  initMinutes: number;
  timerMinutes: number;
  timerSeconds: number;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  setInitMinutes: Dispatch<SetStateAction<number>>;
  setTimerMinutes: Dispatch<SetStateAction<number>>;
  setTimerSeconds: Dispatch<SetStateAction<number>>;
  handleTimerTimeSettingVisible: (event: GestureResponderEvent) => void;
};

export type SetTimeModalProps = Pick<
  TimerProps,
  | "timerTimeSettingVisible"
  | "initMinutes"
  | "setInitMinutes"
  | "setTimerMinutes"
  | "handleTimerTimeSettingVisible"
>;

export type ControlTimerProps = Pick<
  TimerProps,
  | "isRunning"
  | "initMinutes"
  | "timerMinutes"
  | "timerSeconds"
  | "setIsRunning"
  | "setTimerMinutes"
  | "setTimerSeconds"
  | "handleTimerTimeSettingVisible"
>;
