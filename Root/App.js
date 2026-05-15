Import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

// Soo dejinta boggaga (Hubi inay magacyadu isku mid yihiin GitHub-kaaga)
import HomeScreen from './HomeScreen';
import AddTaskScreen from './AddTaskScreen';
import StatsScreen from './StatsScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Waxaan ka dhigaynaa Status Bar-ka mid cad maadaama app-ku madow yahay */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Waxaan u daminnay si aan u isticmaalno custom headers
          animation: 'slide_from_right', // Animation qurux badan marka boggaga la kala beddelo
          contentStyle: { backgroundColor: '#000' } // Background-ka guud waa madow
        }}
      >
        {/* Bogga Dashboard-ka */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Bogga lagu daro hawlaha (AddTask) */}
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
        
        {/* Bogga Tirakoobka (Stats) */}
        <Stack.Screen name="Stats" component={StatsScreen} />
        
        {/* Bogga Profile-ka */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
