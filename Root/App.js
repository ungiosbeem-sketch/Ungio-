import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// 1. Soo daji bogagga app-ka (Hubi inay magacyadu sax yihiin)
import HomeScreen from './HomeScreen';
import AddTaskScreen from './AddTaskScreen';

// 2. Abuuro bogagga hadda dhiman (Placeholders)
// Waxaad ku beddeli doontaa fayllada rasmiga ah markaan dhisno
function CalendarScreen() { 
  return <View style={{ flex: 1, backgroundColor: '#000' }} />; 
}
function StatsScreen() { 
  return <View style={{ flex: 1, backgroundColor: '#000' }} />; 
}
function ProfileScreen() { 
  return <View style={{ flex: 1, backgroundColor: '#000' }} />; 
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 3. Qaybta Bottom Tabs (Home, Calendar, Stats, Profile)
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
          borderTopColor: 'transparent',
          elevation: 0
        },
        tabBarActiveTintColor: '#FFD700', // Midabka dahabka ah markaad taabato
        tabBarInactiveTintColor: '#444',   // Midabka cawlka ah markaad ka maqan tahay
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Calendar') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Stats') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          
          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 4. Maamulaha guud ee isku xiraya Tabs-ka iyo bogga AddTask
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right' 
        }}
      >
        {/* Marka hore Tabs-ka ayaa soo baxaya */}
        <Stack.Screen name="MainTabs" component={MyTabs} />
        
        {/* Bogga AddTask wuxuu dusha ka fuulayaa Tabs-ka */}
        <Stack.Screen 
          name="AddTask" 
          component={AddTaskScreen} 
          options={{ 
            animation: 'slide_from_bottom', // Wuxuu ka soo kacayaa hoos sidii naqshadda
            presentation: 'modal' 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
