import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useFonts, Mulish_900Black } from "@expo-google-fonts/mulish";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [fontsLoaded] = useFonts({
    Mulish_900Black,
  });
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        if (fontsLoaded) {
          setLoadingComplete(true);
          SplashScreen.hideAsync();
        }
      }
    }
    loadResourcesAndDataAsync();
  }, [fontsLoaded]);
  return isLoadingComplete;
}
