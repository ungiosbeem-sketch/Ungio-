import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, TextInput, Alert, ActivityIndicator, StatusBar, Platform 
} from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from './supabase';

// Habaynta Notification-ka
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    getTasks();
    requestPermissions();
  }, []);

  async function requestPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Oggolaansho', 'Fadlan oggolow notification-ka si app-ku kuu xasuusiyo!');
    }
  }

  async function getTasks() {
    setLoading(true);
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    if (!error) setTasks(data || []);
    setLoading(false);
  }

  async function handleAddTask() {
    if (taskTitle.trim() === '') return;

    // A. Qorshee Notification-ka (Alarm)
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Ungio Xasuusin! 🔔",
          body: `Waa waqtigii: ${taskTitle}`,
          sound: true,
        },
        trigger: date, 
      });
    } catch (e) {
      console.log("Notification error", e);
    }

    // B. Ku dar Database-ka
    const { error } = await supabase.from('tasks').insert([{ 
      title: taskTitle, 
      priority: priority,
      due_time: date.toISOString(),
      status: 'active' 
    }]);

    if (!error) {
      setTaskTitle('');
      getTasks();
      Alert.alert("Guul", "Hawsha iyo Alarm-ka waa la keydiyey!");
    }
  }

  async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (!error) getTasks();
  }

  async function toggleComplete(id, currentStatus) {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    if (!error) getTasks();
  }

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const getPriorityColor = (p) => {
    if (p === 'high') return '#FF4444';
    if (p === 'medium') return '#FFD700';
    return '#44FF44';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.logo}>Ungio Pro 🔥</Text>
          <TextInput 
            style={styles.searchBar}
            placeholder="Raadi hawlaha..."
            placeholderTextColor="#666"
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.inputBox}>
          <TextInput 
            style={styles.input}
            placeholder="Maxaad qabanaysaa?"
            placeholderTextColor="#888"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.optBtn}>
              <Text style={styles.optBtnText}>⏰ {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPriority(priority === 'high' ? 'low' : 'high')} style={[styles.optBtn, {borderColor: getPriorityColor(priority)}]}>
              <Text style={{color: getPriorityColor(priority), fontSize: 11}}>Priority: {priority}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
            <Text style={styles.addBtnText}>Add Task & Set Alarm</Text>
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker value={date} mode="time" is24Hour={true} onChange={(e, d) => {setShowPicker(false); if(d) setDate(d)}} />
        )}

        <ScrollView style={styles.list}>
          {loading ? <ActivityIndicator color="#FFD700" /> : filteredTasks.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.card, item.status === 'completed' && styles.completedCard]}
              onPress={() => toggleComplete(item.id, item.status)}
              onLongPress={() => Alert.alert('Tirtir', 'Ma hubaal baa?', [{text: 'Maya'}, {text: 'Haa', onPress: () => deleteTask(item.id)}])}
            >
              <View style={[styles.priorityLine, {backgroundColor: getPriorityColor(item.priority)}]} />
              <View style={{flex: 1}}>
                <Text style={[styles.taskTitle, item.status === 'completed' && styles.strikeText]}>{item.title}</Text>
                <Text style={styles.taskTime}>🔔 {new Date(item.due_time).toLocaleTimeString()}</Text>
              </View>
              <View style={[styles.statusBadge, {backgroundColor: item.status === 'completed' ? '#44FF44' : '#222'}]}>
                <Text style={styles.statusText}>{item.status === 'completed' ? '✓' : '...'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  safeArea: { flex: 1 },
  header: { padding: 20 },
  logo: { color: '#FFD700', fontSize: 26, fontWeight: 'bold', marginBottom: 15 },
  searchBar: { backgroundColor: '#111', color: '#fff', padding: 12, borderRadius: 12 },
  inputBox: { backgroundColor: '#111', marginHorizontal: 20, padding: 20, borderRadius: 25, marginBottom: 10 },
  input: { color: '#fff', fontSize: 18, marginBottom: 15 },
  optionsRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  optBtn: { borderWidth: 1, borderColor: '#333', padding: 8, borderRadius: 10 },
  optBtnText: { color: '#FFD700', fontSize: 11 },
  addBtn: { backgroundColor: '#FFD700', padding: 15, borderRadius: 15, alignItems: 'center' },
  addBtnText: { fontWeight: 'bold', fontSize: 15 },
  list: { paddingHorizontal: 20 },
  card: { flexDirection: 'row', backgroundColor: '#111', marginBottom: 12, borderRadius: 15, overflow: 'hidden', alignItems: 'center', paddingRight: 15 },
  priorityLine: { width: 6, height: '100%', marginRight: 15 },
  taskTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  taskTime: { color: '#555', fontSize: 11, marginTop: 4 },
  strikeText: { textDecorationLine: 'line-through', color: '#444' },
  statusBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  statusText: { color: '#000', fontWeight: 'bold' },
  completedCard: { opacity: 0.5 }
});
  
