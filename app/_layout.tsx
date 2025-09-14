import { Stack } from "expo-router";
import { WeatherProvider } from "../contexts/WeatherContext";

export default function RootLayout() {
  return (
    <WeatherProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </WeatherProvider>
  );
}
