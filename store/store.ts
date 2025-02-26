import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("저장 에러:", error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log("데이터 없음");
    }
  } catch (error) {
    console.log("가져오기 에러:", error);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("데이터 삭제 완료");
  } catch (error) {
    console.log("삭제 에러:", error);
  }
};
