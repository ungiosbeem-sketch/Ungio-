import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Switch, Alert, SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from './supabase';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Study');
  const [reminder, setReminder] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState('date');

  async function saveTask() {
    if (!title) return Alert.alert("Error", "Fadlan qor cinwaanka hawsha");

    const { error } = await supabase.from('tasks').insert([{
      title: title,
      priority: priority.toLowerCase(),
      category: category,
      due_time: date.toISOString(),
      status: 'active'
    }]);

    if (!error) {
      Alert.alert("Guul", "Hawsha waa la keydiyey!");
      navigation.goBack(); // Dib ugu noqo Home-ka
    }
  }

  const categories = ['Study', 'Work', 'Personal'];
  const priorities = ['Low', 'Medium', 'High'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hawl cusub</Text>
        <TouchableOpacity onPress={saveTask}>
          <Ionicons name="checkmark-circle" size={32} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.label}>Cinwaanka hawsha</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Tusaale: Wax akhris" 
          placeholderTextColor="#444"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Sharaxaad (Ikhtiyaari)</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          multiline 
          placeholder="Faahfaahin dheeraad ah..." 
          placeholderTextColor="#444"
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Taariikh</Text>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => {setMode('date'); setShowPicker(true)}}>
              <Ionicons name="calendar-outline" size={20} color="#FFD700" />
              <Text style={styles.pickerText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginLeft: 10}}>
            <Text style={styles.label}>Saacad</Text>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => {setMode('time'); setShowPicker(true)}}>
              <Ionicons name="time-outline" size={20} color="#FFD700" />
              <Text style={styles.pickerText}>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Mudnaan (Priority)</Text>
        <View style={styles.optionRow}>
          {priorities.map(p => (
            <TouchableOpacity 
              key={p} 
              style={[styles.chip, priority === p && styles.chipActive]} 
              onPress={() => setPriority(p)}
            >
              <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Qeybta (Category)</Text>
        <View style={styles.optionRow}>
          {categories.map(c => (
            <TouchableOpacity 
              key={c} 
              style={[styles.chip, category === c && styles.chipActive]} 
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.reminderRow}>
          <View>
            <Text style={styles.reminderTitle}>Xusuusin</Text>
            <Text style={styles.reminderSub}>15 daqiiqo ka hor</Text>
          </View>
          <Switch 
            value={reminder} 
            onValueChange={setReminder} 
            trackColor={{ false: "#222", true: "#FFD700" }}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveTask}>
          <Text style={styles.saveBtnText}>Kaydi hawsha</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker 
            value={date} 
            mode={mode} 
            is24Hour={true} 
            onChange={(e, d) => {setShowPicker(false); if(d) setDate(d)}} 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  form: { padding: 20 },
  label: { color: '#888', fontSize: 14, marginBottom: 10, marginTop: 15 },
  input: { backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 15, fontSize: 16 },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', marginTop: 10 },
  pickerBtn: { backgroundColor: '#111', flexDirection: 'row', padding: 15, borderRadius: 15, alignItems: 'center' },
  pickerText: { color: '#fff', marginLeft: 10 },
  optionRow: { flexDirection: 'row', gap: 10 },
  chip: { backgroundColor: '#111', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: '#222' },
  chipActive: { backgroundColor: '#FFD700', borderColor: '#FFD700' },
  chipText: { color: '#888' },
  chipTextActive: { color: '#000', fontWeight: 'bold' },
  reminderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', padding: 20, borderRadius: 20, marginTop: 30 },
  reminderTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  reminderSub: { color: '#666', fontSize: 12 },
  saveBtn: { backgroundColor: '#FFD700', padding: 20, borderRadius: 20, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  saveBtnText: { color: '#000', fontSize: 18, fontWeight: 'bold' }
});
            
