import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hawl cusub</Text>
        <TouchableOpacity style={styles.saveIcon}>
          <Ionicons name="checkmark-circle" size={32} color="#FFD700" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{padding: 20}}>
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
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]} 
          placeholder="Faahfaahin dheeraad ah..." 
          placeholderTextColor="#444"
          multiline
          value={desc}
          onChangeText={setDesc}
        />

        <View style={styles.row}>
          <View style={{flex: 1, marginRight: 10}}>
            <Text style={styles.label}>Taariikh</Text>
            <TouchableOpacity style={styles.selector}><Text style={{color: 'white'}}>15 May 2026</Text></TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Saacad</Text>
            <TouchableOpacity style={styles.selector}><Text style={{color: 'white'}}>04:00 PM</Text></TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.mainBtn}>
          <Text style={styles.mainBtnText}>Kaydi hawsha</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  label: { color: '#888', marginTop: 20, marginBottom: 10 },
  input: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 15, color: 'white', fontSize: 16 },
  row: { flexDirection: 'row', marginTop: 10 },
  selector: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 12, alignItems: 'center' },
  mainBtn: { backgroundColor: '#FFD700', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 40 },
  mainBtnText: { color: 'black', fontWeight: 'bold', fontSize: 16 }
});
            
