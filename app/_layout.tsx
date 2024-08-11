import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MacAddressProvider } from "@/context/MacAddressContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <MacAddressProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="player"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </MacAddressProvider>
    </QueryClientProvider>
  );
}
