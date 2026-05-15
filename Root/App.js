import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, TextInput, StatusBar, Alert, ActivityIndicator 
} from 'react-native';
import { supabase } from './supabase';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priority, setPriority] = useState('medium'); // High, Medium, Low

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setTasks(data || []);
  }

  async function handleAddTask() {
    if (taskTitle.trim() === '') return;
    setLoading(true);
    const { error } = await supabase
      .from('tasks')
      .insert([{ title: taskTitle, priority: priority, status: 'active' }]);
    
    if (!error) {
      setTaskTitle('');
      getTasks();
    }
    setLoading(false);
  }

  async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) getTasks();
  }

  async function toggleComplete(id, currentStatus) {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus, is_completed: newStatus === 'completed' })
      .eq('id', id);
    if (!error) getTasks();
  }

  const getPriorityColor = (p) => {
    if (p === 'high') return '#FF4444'; // Red
    if (p === 'medium') return '#FFD700'; // Yellow
    return '#44FF44'; // Green
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.userName}>Ungio Planner 🔥</Text>
          <Text style={styles.greeting}>Maamul hawlahaaga, Abdalla</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {tasks.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={styles.emptyText}>Hawl ma jirto maanta</Text>
            </View>
          ) : (
            tasks.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={[styles.listItem, item.status === 'completed' && {opacity: 0.5}]}
                onLongPress={() => Alert.alert('Delete', 'Ma tirtirtaa hawshan?', [
                  {text: 'Maya'}, {text: 'Haa', onPress: () => deleteTask(item.id)}
                ])}
                onPress={() => toggleComplete(item.id, item.status)}
              >
                <View style={[styles.statusDot, {backgroundColor: getPriorityColor(item.priority)}]} />
                <View style={{flex: 1}}>
                  <Text style={[styles.itemTitle, item.status === 'completed' && {textDecorationLine: 'line-through'}]}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemSub}>{item.category || 'Personal'}</Text>
                </View>
                <View style={[styles.badge, {backgroundColor: item.status === 'completed' ? '#44FF44' : '#333'}]}>
                   <Text style={styles.badgeText}>{item.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        {/* Input Area (Pinned to Bottom) */}
        <View style={styles.inputSection}>
          <TextInput 
            style={styles.input}
            placeholder="Maxaad qorshaynaysaa?"
            placeholderTextColor="#888"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  safeArea: { flex: 1 },
  header: { padding: 25 },
  userName: { color: '#FFD700', fontSize: 28, fontWeight: '900' },
  greeting: { color: '#666', fontSize: 14, marginTop: 5 },
  scrollContent: { padding: 20, paddingBottom: 100 },
  listItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#111', 
    padding: 18, borderRadius: 20, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5
  },
  statusDot: { width: 12, height: 12, borderRadius: 6, marginRight: 15 },
  itemTitle: { color: '#fff', fontSize: 17, fontWeight: '600' },
  itemSub: { color: '#555', fontSize: 12, marginTop: 3 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#000', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  inputSection: { 
    position: 'absolute', bottom: 30, left: 20, right: 20, 
    flexDirection: 'row', alignItems: 'center' 
  },
  input: { 
    flex: 1, backgroundColor: '#1a1a1a', color: '#fff', padding: 18, 
    borderRadius: 20, fontSize: 16, marginRight: 10, borderWidth: 1, borderColor: '#333'
  },
  fab: { 
    backgroundColor: '#FFD700', width: 55, height: 55, borderRadius: 20, 
    justifyContent: 'center', alignItems: 'center', elevation: 5 
  },
  fabText: { fontSize: 30, fontWeight: 'bold', color: '#000' },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyIcon: { fontSize: 60, marginBottom: 10 },
  emptyText: { color: '#444', fontSize: 16 }
});
    
