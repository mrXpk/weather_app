import { Stack } from "expo-router";
import { WeatherProvider } from "../contexts/WeatherContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <WeatherProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' }
      }} />
    </WeatherProvider>
  );
}
