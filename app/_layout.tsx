// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { AuthProvider } from '../store/AuthContext'; // Context-ga xogta qofka
import { theme } from '../theme'; // Midabadii aan hore u sameynay

export default function RootLayout() {
  return (
    // 1. Marka hore xogta qofka (Auth)
    <AuthProvider>
      {/* 2. Ka dib muuqaalka (Theme) */}
      <ThemeProvider value={DarkTheme}>
        <StatusBar style="light" />
        
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          {/* Bogagga app-ka */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Bogga chat-ka ee gaarka ah - waxaan ku darnay halkan si uu header u yeesho */}
          <Stack.Screen 
            name="chat/[id]" 
            options={{ 
              headerShown: true, 
              headerTitle: "Farriin",
              headerBackTitle: "Back" 
            }} 
          />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
