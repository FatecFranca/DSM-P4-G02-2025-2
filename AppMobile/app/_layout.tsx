import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerStyle: { backgroundColor: "#052338" }, headerTintColor: "white" }}>
      <Stack.Screen name="index" options={{ title: "Cadastro" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="dashboard" options={{ title: "Dashboard" }} />
    </Stack>
}
