import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, TouchableOpacity, 
  SafeAreaView, StatusBar, ActivityIndicator 
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, completed: 0, progress: 0 });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });
    return unsubscribe;
  }, [navigation]);

  async function fetchTasks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

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
    setLoading(false);
  }

  async function toggleComplete(id, currentStatus) {
    const newStatus = currentStatus === 'completed' ? 'active' : 'completed';
    const { error } = await supabase.from('tasks').update({ status: newStatus }).eq('id', id);
    if (!error) fetchTasks();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Ungio Planner</Text>
            <Text style={styles.subText}>Maamul hawlahaaga, Abdalla</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color="#FFD700" />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#444" />
          <Text style={styles.searchText}>Raadi hawlahaaga...</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <AnimatedCircularProgress
            size={80}
            width={8}
            fill={stats.progress}
            tintColor="#FFD700"
            backgroundColor="#222"
            rotation={0}
            lineCap="round"
          >
            {(fill) => <Text style={styles.progressText}>{stats.progress}%</Text>}
          </AnimatedCircularProgress>
          <View style={styles.statsInfo}>
            <Text style={styles.statLabel}>Total Progress</Text>
            <Text style={styles.statValue}>{stats.completed} ka mid ah {stats.total} hawlood</Text>
            <Text style={styles.statSub}>Waad ku dhowdahay guusha! 🚀</Text>
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hawlaha Maanta</Text>
          <Text style={styles.dateText}>15 May 2026</Text>
        </View>

        {/* Task List */}
        {loading ? (
          <ActivityIndicator color="#FFD700" style={{ marginTop: 20 }} />
        ) : (
          tasks.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.taskCard, item.status === 'completed' && styles.completedCard]}
              onPress={() => toggleComplete(item.id, item.status)}
            >
              <View style={[styles.priorityLine, { backgroundColor: item.priority === 'high' ? '#FF4444' : '#FFD700' }]} />
              <View style={styles.taskBody}>
                <Text style={[styles.taskTitle, item.status === 'completed' && styles.strikeText]}>{item.title}</Text>
                <View style={styles.timeRow}>
                  <Ionicons name="time-outline" size={14} color="#555" />
                  <Text style={styles.taskTime}>{new Date(item.due_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</Text>
                  <Text style={styles.categoryTag}>{item.category || 'General'}</Text>
                </View>
              </View>
              <Ionicons 
                name={item.status === 'completed' ? "checkmark-circle" : "ellipse-outline"} 
                size={26} 
                color={item.status === 'completed' ? "#44FF44" : "#333"} 
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddTask')}
      >
        <Ionicons name="add" size={36} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  welcomeText: { color: '#FFD700', fontSize: 28, fontWeight: 'bold' },
  subText: { color: '#666', fontSize: 14, marginTop: 2 },
  notifBtn: { backgroundColor: '#111', padding: 10, borderRadius: 12 },
  notifDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, backgroundColor: 'red', borderRadius: 4 },
  searchBar: { backgroundColor: '#111', flexDirection: 'row', padding: 16, borderRadius: 18, alignItems: 'center', marginBottom: 25 },
  searchText: { color: '#444', marginLeft: 12, fontSize: 15 },
  statsCard: { backgroundColor: '#111', padding: 20, borderRadius: 28, flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  progressText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  statsInfo: { marginLeft: 20, flex: 1 },
  statLabel: { color: '#666', fontSize: 13, fontWeight: '600' },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginVertical: 4 },
  statSub: { color: '#FFD700', fontSize: 11, opacity: 0.8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  dateText: { color: '#444', fontSize: 13 },
  taskCard: { backgroundColor: '#111', borderRadius: 22, flexDirection: 'row', alignItems: 'center', marginBottom: 14, overflow: 'hidden', paddingRight: 18 },
  priorityLine: { width: 6, height: 80 },
  taskBody: { flex: 1, paddingLeft: 18, justifyContent: 'center' },
  taskTitle: { color: '#fff', fontSize: 17, fontWeight: '600' },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  taskTime: { color: '#555', fontSize: 13, marginLeft: 5 },
  categoryTag: { color: '#FFD700', fontSize: 10, backgroundColor: '#221a00', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginLeft: 10 },
  strikeText: { textDecorationLine: 'line-through', color: '#444' },
  completedCard: { opacity: 0.6 },
  fab: { position: 'absolute', bottom: 30, right: 25, backgroundColor: '#FFD700', width: 65, height: 65, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#FFD700', shadowOpacity: 0.3, shadowRadius: 10 }
});
