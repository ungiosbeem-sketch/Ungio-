import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    if (!title) {
      Alert.alert("Error", "Fadlan qor magaca hawsha.");
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .insert([{ title, status: 'pending' }]);

    if (error) {
      Alert.alert("Error", "Xogta lama kaydin karo.");
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Task</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>What are you planning?</Text>
        <TextInput 
          style={styles.input}
          placeholder="Task Name..."
          value={title}
          onChangeText={setTitle}
          autoFocus
        />
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 50, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  form: { padding: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 10 },
  input: { fontSize: 22, borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 10, marginBottom: 30 },
  saveButton: { backgroundColor: '#4A90E2', padding: 15, borderRadius: 12, alignItems: 'center' },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
