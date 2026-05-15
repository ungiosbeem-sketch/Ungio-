import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, ScrollView, 
  TouchableOpacity, TextInput, StatusBar, Alert, Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from './supabase';

export default function App() {
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date'); // 'date' ama 'time'

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  async function handleAddTask() {
    if (taskTitle.trim() === '') return;
    
    const { error } = await supabase
      .from('tasks')
      .insert([{ 
        title: taskTitle, 
        due_time: date.toISOString(), // Halkan ayuu u raacayaa database-ka
        status: 'active' 
      }]);
    
    if (!error) {
      setTaskTitle('');
      getTasks();
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.userName}>Ungio Scheduler</Text>
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Maxaad qorshaynaysaa?"
            placeholderTextColor="#888"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          
          <View style={styles.pickerButtons}>
            <TouchableOpacity onPress={() => showMode('date')} style={styles.miniBtn}>
              <Text style={styles.miniBtnText}>📅 Maalinta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showMode('time')} style={styles.miniBtn}>
              <Text style={styles.miniBtnText}>⏰ Saacadda</Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.list}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskTime}>
                🔔 {new Date(task.due_time).toLocaleString()}
              </Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  safeArea: { flex: 1 },
  header: { padding: 20 },
  userName: { color: '#FFD700', fontSize: 24, fontWeight: 'bold' },
  inputContainer: { padding: 20, backgroundColor: '#111', margin: 15, borderRadius: 20 },
  input: { color: '#fff', fontSize: 18, borderBottomWidth: 1, borderColor: '#333', paddingBottom: 10 },
  pickerButtons: { flexDirection: 'row', marginTop: 15, gap: 10 },
  miniBtn: { backgroundColor: '#222', padding: 8, borderRadius: 10 },
  miniBtnText: { color: '#FFD700', fontSize: 12 },
  addButton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 15, marginTop: 15, alignItems: 'center' },
  addButtonText: { color: '#000', fontWeight: 'bold' },
  list: { padding: 20 },
  taskCard: { backgroundColor: '#111', padding: 15, borderRadius: 15, marginBottom: 10 },
  taskTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  taskTime: { color: '#888', fontSize: 12, marginTop: 5 }
});
           
