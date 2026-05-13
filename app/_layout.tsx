// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import { AuthProvider } from '../store/AuthContext'; // Maamulka qofka soo galaya
import { ChatProvider } from '../store/ChatContext'; // Maamulka fariimaha
import { theme } from '../theme'; // Midabadii aan u qorsheynay

export default function RootLayout() {
  return (
    // 1. Marka hore xogta qofka (Auth)
    <AuthProvider>
      {/* 2. Ka dib xogta chat-ka (Chat) */}
      <ChatProvider>
        {/* 3. Ugu dambayn muuqaalka (Theme) */}
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
            {/* Bogagga ay tahay in Expo Router uu aqoonsado */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            
            {/* Bogga chat-ka ee gaarka ah */}
            <Stack.Screen 
              name="chat/[id]" 
              options={{ 
                headerShown: true, 
                title: "Farriin",
                headerBackTitle: "Back" 
              }} 
            />
          </Stack>
        </ThemeProvider>
      </ChatProvider>
    </AuthProvider>
  );
}
