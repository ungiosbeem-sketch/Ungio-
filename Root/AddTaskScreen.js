import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase'; // Soo jiid xiriirka Supabase

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title) {
      Alert.alert("Error", "Fadlan qor cinwaanka hawsha.");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from('tasks') // Hubi in magaca table-kaaga uu yahay 'tasks'
      .insert([{ title, status: 'pending', created_at: new Date() }]);

    setLoading(false);

    if (error) {
      Alert.alert("Cillad", error.message);
    } else {
      navigation.goBack(); // Dib ugu laabo guriga marka la kaydiyo
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hawl cusub</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <Ionicons name="checkmark-circle" size={32} color={loading ? "#555" : "#FFD700"} />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20}}>
        <Text style={styles.label}>Cinwaanka hawsha</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Maxaad qorshaynaysaa?" 
          placeholderTextColor="#444"
          value={title}
          onChangeText={setTitle}
        />
        
        <TouchableOpacity style={styles.mainBtn} onPress={handleSave} disabled={loading}>
          <Text style={styles.mainBtnText}>{loading ? "Waa la kaydinayaa..." : "Kaydi hawsha"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  label: { color: '#888', marginTop: 20, marginBottom: 10 },
  input: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 15, color: 'white', fontSize: 16 },
  mainBtn: { backgroundColor: '#FFD700', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 40 },
  mainBtnText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});
  
