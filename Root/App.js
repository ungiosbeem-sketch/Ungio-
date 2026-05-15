import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Soo dejinta bogagga (Hubi in magacyadan ay u qoran yihiin sida GitHub-kaaga)
import HomeScreen from './HomeScreen';
import AddTaskScreen from './AddTaskScreen';
import StatsScreen from './StatsScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right' // Animation qurux badan marka bogga la beddelo
        }}
      >
        {/* Bogga koowaad ee Dashboard-ka */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Bogga lagu daro hawlaha cusub */}
        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen} 
          options={{ 
            animation: 'slide_from_bottom',
            presentation: 'modal' 
          }} 
        />
        
        {/* Bogga Garaafyada iyo Horumarka */}
        <Stack.Screen name="Stats" component={StatsScreen} />
        
        {/* Bogga macluumaadka isticmaalaha */}
        <Stack.Screen name="Profile" component={ProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
