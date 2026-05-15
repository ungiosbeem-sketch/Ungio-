import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

export default function HomeScreen() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, progress: 0 });

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      const completed = data.filter(t => t.status === 'completed').length;
      const total = data.length;
      setTasks(data);
      setStats({
        total,
        completed,
        progress: total > 0 ? Math.round((completed / total) * 100) : 0
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Ungio Planner</Text>
            <Text style={styles.subText}>Maamul hawlahaaga, Abdalla</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>

        {/* Search Bar Placeholder */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchText}>Raadi hawlaha...</Text>
        </View>

        {/* Stats Section (Horizontal Cards) */}
        <View style={styles.statsRow}>
          <View style={styles.statsCardMain}>
             <AnimatedCircularProgress
                size={60}
                width={6}
                fill={stats.progress}
                tintColor="#FFD700"
                backgroundColor="#222"
              >
                { (fill) => <Text style={styles.progressText}>{stats.progress}%</Text> }
              </AnimatedCircularProgress>
              <View style={{marginLeft: 15}}>
                <Text style={styles.statLabel}>Progress</Text>
                <Text style={styles.statValue}>{stats.completed}/{stats.total} Hawlood</Text>
              </View>
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hawlaha Maanta</Text>
          <Text style={styles.dateText}>15 May 2026</Text>
        </View>

        {tasks.map((item) => (
          <TouchableOpacity key={item.id} style={styles.taskCard}>
            <View style={[styles.priorityLine, { backgroundColor: item.priority === 'high' ? '#FF4444' : '#FFD700' }]} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskTime}>⏰ {new Date(item.due_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
            </View>
            <View style={styles.checkIcon}>
              <Ionicons 
                name={item.status === 'completed' ? "checkbox" : "square-outline"} 
                size={24} 
                color={item.status === 'completed' ? "#44FF44" : "#444"} 
              />
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeText: { color: '#FFD700', fontSize: 26, fontWeight: 'bold' },
  subText: { color: '#666', fontSize: 14 },
  searchBar: { backgroundColor: '#111', flexDirection: 'row', padding: 15, borderRadius: 15, alignItems: 'center', marginBottom: 25 },
  searchText: { color: '#666', marginLeft: 10 },
  statsRow: { marginBottom: 30 },
  statsCardMain: { backgroundColor: '#111', padding: 20, borderRadius: 25, flexDirection: 'row', alignItems: 'center' },
  progressText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 14 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  dateText: { color: '#444', fontSize: 12 },
  taskCard: { backgroundColor: '#111', borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12, overflow: 'hidden' },
  priorityLine: { width: 6, height: '100%' },
  taskInfo: { flex: 1, padding: 20 },
  taskTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  taskTime: { color: '#555', fontSize: 12, marginTop: 5 },
  checkIcon: { paddingRight: 20 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#FFD700', width: 60, height: 60, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});
