import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// 1. Soo daji bogagga app-ka (Hubi in fayl kasta magaciisu sax yahay)
import HomeScreen from './HomeScreen';
import AddTaskScreen from './AddTaskScreen';
import StatsScreen from './StatsScreen'; // Waxay ka dhimanayd koodhkaagii
import ProfileScreen from './ProfileScreen'; // Waxay ka dhimanayd koodhkaagii

// 2. Bogga Calendar (Hadda placeholder ka dhig haddii uusan diyaar ahayn)
import { View } from 'react-native';
function CalendarScreen() { 
  return <View style={{ flex: 1, backgroundColor: '#000' }} />; 
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 3. Qaybta Bottom Tabs
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#000', 
          borderTopWidth: 0, 
          height: 75,
          paddingBottom: 15,
          paddingTop: 10,
          position: 'absolute',
          elevation: 0
        },
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#444',
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Calendar') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Stats') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 4. Maamulaha guud
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MyTabs} />
        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen} 
          options={{ 
            animation: 'slide_from_bottom',
            presentation: 'transparentModal' 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
      }
    
