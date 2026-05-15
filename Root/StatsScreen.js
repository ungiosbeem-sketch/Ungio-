import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, SafeAreaView, 
  StatusBar, Dimensions 
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

const screenWidth = Dimensions.get("window").width;

export default function StatsScreen() {
  const [stats, setStats] = useState({ total: 0, completed: 0, progress: 0, streak: 7 });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data, error } = await supabase.from('tasks').select('*');
    if (!error && data) {
      const completed = data.filter(t => t.status === 'completed').length;
      const total = data.length;
      setStats({
        total,
        completed,
        progress: total > 0 ? Math.round((completed / total) * 100) : 0,
        streak: 7 // Tusaale ahaan
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Main Progress Circle */}
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>This Week</Text>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={180}
              width={15}
              fill={stats.progress}
              tintColor="#FFD700"
              backgroundColor="#222"
              rotation={0}
              lineCap="round"
            >
              {(fill) => (
                <View style={styles.innerCircle}>
                  <Text style={styles.percentText}>{stats.progress}%</Text>
                  <Text style={styles.subPercentText}>Hawlaha la{"\n"}dhammeeyey</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.countRow}>
            <Text style={styles.countText}>{stats.completed} / {stats.total}</Text>
          </View>
        </View>

        {/* Small Stats Row */}
        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallLabel}>Dhammaan</Text>
            <Text style={styles.smallValue}>{stats.total}</Text>
          </View>
          <View style={[styles.smallCard, { borderColor: '#44FF44' }]}>
            <Text style={styles.smallLabel}>Dhammeeyay</Text>
            <Text style={[styles.smallValue, { color: '#44FF44' }]}>{stats.completed}</Text>
          </View>
          <View style={[styles.smallCard, { borderColor: '#FF4444' }]}>
            <Text style={styles.smallLabel}>Hadhay</Text>
            <Text style={[styles.smallValue, { color: '#FF4444' }]}>{stats.total - stats.completed}</Text>
          </View>
        </View>

        {/* Streak Card */}
        <View style={styles.streakCard}>
          <Ionicons name="flame" size={30} color="#FF4500" />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.streakLabel}>Streak</Text>
            <Text style={styles.streakValue}>{stats.streak} maalmood</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 20, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  mainCard: { backgroundColor: '#111', borderRadius: 30, padding: 25, alignItems: 'center', marginBottom: 20 },
  cardTitle: { color: '#666', fontSize: 16, fontWeight: '600', alignSelf: 'flex-start', marginBottom: 20 },
  progressContainer: { marginVertical: 10 },
  innerCircle: { alignItems: 'center' },
  percentText: { color: '#fff', fontSize: 40, fontWeight: 'bold' },
  subPercentText: { color: '#444', fontSize: 12, textAlign: 'center', marginTop: 5 },
  countRow: { marginTop: 20 },
  countText: { color: '#FFD700', fontSize: 20, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  smallCard: { backgroundColor: '#111', borderRadius: 20, padding: 15, width: '31%', alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  smallLabel: { color: '#555', fontSize: 10, marginBottom: 5 },
  smallValue: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  streakCard: { backgroundColor: '#111', borderRadius: 25, padding: 20, flexDirection: 'row', alignItems: 'center' },
  streakLabel: { color: '#666', fontSize: 14 },
  streakValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
                
