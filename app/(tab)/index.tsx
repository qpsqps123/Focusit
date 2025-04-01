import TodoList from "@/containers/TodoList";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function TodoListTab() {
  useEffect(() => {
    const loadResources = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Failed to hide splash screen:", e);
      }
    };

    loadResources();
  }, []);

  return (
    <>
      <TodoList />
    </>
  );
}
