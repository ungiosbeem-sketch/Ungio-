import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, TextInput, StatusBar, Alert, ActivityIndicator 
} from 'react-native';
import { supabase } from './supabase';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.log('Error:', error.message);
    else setTasks(data || []);
  }

  async function handleAddTask() {
    if (taskTitle.trim() === '') return;
    setLoading(true);

    const { error } = await supabase
      .from('tasks')
      .insert([{ title: taskTitle, status: 'active' }]);

    if (error) {
      Alert.alert('Cilad', error.message);
    } else {
      setTaskTitle('');
      getTasks();
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.userName}>Ungio Planner</Text>
          <Text style={styles.greeting}>Maamul hawlahaaga, Abdalla</Text>
        </View>

        <View style={styles.inputCard}>
          <TextInput 
            style={styles.input}
            placeholder="Maxaad qorshaynaysaa?"
            placeholderTextColor="#888"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask} disabled={loading}>
            {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.addButtonText}>+</Text>}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Hawlaha dhiman</Text>
          {tasks.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <View style={styles.statusDot} />
              <View style={{flex: 1}}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSub}>{new Date(item.created_at).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.statusLabel}>{item.status}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  safeArea: { flex: 1 },
  header: { padding: 20 },
  userName: { color: '#FFD700', fontSize: 26, fontWeight: 'bold' },
  greeting: { color: '#888', fontSize: 14 },
  inputCard: { 
    flexDirection: 'row', padding: 15, backgroundColor: 'rgba(255,255,255,0.05)', 
    marginHorizontal: 20, borderRadius: 15, alignItems: 'center' 
  },
  input: { flex: 1, color: '#fff', fontSize: 16 },
  addButton: { backgroundColor: '#FFD700', width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#000', fontSize: 24, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, marginBottom: 15 },
  listItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' 
  },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FFD700', marginRight: 15 },
  itemTitle: { color: '#fff', fontSize: 16 },
  itemSub: { color: '#666', fontSize: 12 },
  statusLabel: { color: '#FFD700', fontSize: 10, fontWeight: 'bold' }
});
    
