import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, Switch, Alert, SafeAreaView, StatusBar 
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
    if (!title) return Alert.alert("Fadlan", "Qor cinwaanka hawsha");

    const { error } = await supabase.from('tasks').insert([{
      title: title,
      priority: priority.toLowerCase(),
      category: category,
      due_time: date.toISOString(),
      status: 'active'
    }]);

    if (!error) {
      navigation.goBack();
    } else {
      Alert.alert("Cillad", "Ma suurtagalin in la keydiyo.");
    }
  }

  const categories = ['Study', 'Work', 'Personal', 'Gym'];
  const priorities = ['Low', 'Medium', 'High'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hawl cusub</Text>
        <TouchableOpacity onPress={saveTask}>
          <Ionicons name="checkmark-done-circle" size={35} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Cinwaanka hawsha</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Maxaad qabanaysaa?" 
          placeholderTextColor="#333"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Sharaxaad (Notes)</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          multiline 
          placeholder="Faahfaahin ku dar..." 
          placeholderTextColor="#333"
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.row}>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Taariikhda</Text>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => {setMode('date'); setShowPicker(true)}}>
              <Ionicons name="calendar-outline" size={20} color="#FFD700" />
              <Text style={styles.pickerText}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginLeft: 15}}>
            <Text style={styles.label}>Saacadda</Text>
            <TouchableOpacity style={styles.pickerBtn} onPress={() => {setMode('time'); setShowPicker(true)}}>
              <Ionicons name="time-outline" size={20} color="#FFD700" />
              <Text style={styles.pickerText}>{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Mudnaanta (Priority)</Text>
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

        <View style={styles.reminderCard}>
          <View style={styles.reminderInfo}>
            <Ionicons name="notifications" size={22} color="#FFD700" />
            <View style={{marginLeft: 15}}>
              <Text style={styles.reminderTitle}>Xusuusin Mobile-ka</Text>
              <Text style={styles.reminderSub}>15 daqiiqo ka hor ayuu ku soo qaylinayaa</Text>
            </View>
          </View>
          <Switch 
            value={reminder} 
            onValueChange={setReminder} 
            trackColor={{ false: "#222", true: "#FFD700" }}
            thumbColor={reminder ? "#fff" : "#444"}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
          <Text style={styles.saveButtonText}>Kaydi hawsha</Text>
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 10 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  backBtn: { backgroundColor: '#111', padding: 8, borderRadius: 12 },
  form: { padding: 20 },
  label: { color: '#666', fontSize: 14, marginBottom: 12, marginTop: 20, fontWeight: '600' },
  input: { backgroundColor: '#111', color: '#fff', padding: 18, borderRadius: 18, fontSize: 16 },
  textArea: { height: 120, textAlignVertical: 'top' },
  row: { flexDirection: 'row', marginTop: 5 },
  pickerBtn: { backgroundColor: '#111', flexDirection: 'row', padding: 18, borderRadius: 18, alignItems: 'center' },
  pickerText: { color: '#fff', marginLeft: 12, fontWeight: '500' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { backgroundColor: '#111', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 25, borderWidth: 1, borderColor: '#222' },
  chipActive: { backgroundColor: '#FFD700', borderColor: '#FFD700' },
  chipText: { color: '#555', fontWeight: 'bold' },
  chipTextActive: { color: '#000' },
  reminderCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111', padding: 20, borderRadius: 22, marginTop: 35 },
  reminderInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  reminderTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  reminderSub: { color: '#555', fontSize: 11, marginTop: 2 },
  saveButton: { backgroundColor: '#FFD700', padding: 22, borderRadius: 22, alignItems: 'center', marginTop: 40, marginBottom: 60, elevation: 5 },
  saveButtonText: { color: '#000', fontSize: 18, fontWeight: 'bold' }
});
                
