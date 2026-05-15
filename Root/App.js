import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, TextInput, StatusBar, Alert, ActivityIndicator 
} from 'react-native';
import { supabase } from './supabase'; // Hubi in faylkani jiro

const Stack = createNativeStackNavigator();

// --- BOGGA HOME: DASHBOARD & TASK MANAGER ---
function HomeScreen({ navigation }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // 1. Soo aqri xogta marka bogga la furo
  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    setRefreshing(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) Alert.alert('Cilad Database', error.message);
    else setTasks(data);
    setRefreshing(false);
  }

  // 2. Ku dar xog cusub Supabase
  async function handleAddTask() {
    if (taskTitle.trim() === '') return;
    setLoading(true);

    const { error } = await supabase
      .from('tasks')
      .insert([{ title: taskTitle, status: 'active' }]);

    if (error) {
      Alert.alert('Lama keydin', error.message);
    } else {
      setTaskTitle('');
      getTasks(); // Dib u cusboonaysii liiska
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.userName}>Ungio Planner</Text>
          <Text style={styles.greeting}>Maamul qorsheyaashaada, Abdalla</Text>
        </View>

        {/* Task Input Section */}
        <View style={styles.inputCard}>
          <TextInput 
            style={styles.input}
            placeholder="Maxaad qorshaynaysaa?"
            placeholderTextColor="#888"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddTask}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.addButtonText}>+</Text>}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hawlaha dhiman</Text>
            <TouchableOpacity onPress={getTasks}>
               <Text style={{color: '#FFD700'}}>Refresh</Text>
            </TouchableOpacity>
          </View>
          
          {tasks.length === 0 && !refreshing ? (
            <Text style={styles.noTasks}>Ma jiraan hawlo kuu diwaangashan.</Text>
          ) : (
            tasks.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.statusDot} />
                <View style={{flex: 1}}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSub}>{new Date(item.created_at).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.statusLabel}>{item.status}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// --- APP ENTRY POINT ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- STYLE-KA ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  safeArea: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 10 },
  userName: { color: '#FFD700', fontSize: 26, fontWeight: 'bold' },
  greeting: { color: '#888', fontSize: 14, marginTop: 4 },
  inputCard: { 
    flexDirection: 'row', padding: 20, alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', marginHorizontal: 20, 
    borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' 
  },
  input: { flex: 1, color: '#fff', fontSize: 16, paddingRight: 10 },
  addButton: { 
    backgroundColor: '#FFD700', width: 45, height: 45, 
    borderRadius: 12, justifyContent: 'center', alignItems: 'center' 
  },
  addButtonText: { color: '#000', fontSize: 24, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  noTasks: { color: '#666', textAlign: 'center', marginTop: 40 },
  listItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    padding: 16, borderRadius: 18, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' 
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFD700', marginRight: 15 },
  itemTitle: { color: '#fff', fontSize: 16, fontWeight: '500' },
  itemSub: { color: '#666', fontSize: 12, marginTop: 2 },
  statusLabel: { color: '#FFD700', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' }
});
              
