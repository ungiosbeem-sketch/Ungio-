import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

export default function StatsScreen() {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const { data, error } = await supabase.from('tasks').select('status');
      if (data) {
        const total = data.length;
        const completed = data.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        setStats({ total, completed, pending });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (loading) return <View style={styles.center}><ActivityIndicator color="#FFD700" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      <ScrollView style={{padding: 20}}>
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Hawlaha la dhammeeyay</Text>
          <View style={[styles.progressCircle, {borderColor: percentage > 50 ? '#4CAF50' : '#FFD700'}]}>
             <Text style={styles.percentText}>{percentage}%</Text>
             <Text style={{color: '#888', fontSize: 12}}>{stats.completed} / {stats.total}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatBox num={stats.total} label="Dhammaan" color="#4A90E2" />
          <StatBox num={stats.completed} label="Dhammeeyay" color="#4CAF50" />
          <StatBox num={stats.pending} label="Hadhay" color="#FF5252" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const StatBox = ({ num, label, color }) => (
  <View style={styles.gridItem}>
    <Text style={[styles.gridNum, {color: color}]}>{num}</Text>
    <Text style={styles.gridLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  center: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  title: { color: 'white', fontSize: 26, fontWeight: 'bold', paddingHorizontal: 20 },
  chartBox: { backgroundColor: '#1A1A1A', padding: 30, borderRadius: 24, alignItems: 'center', marginTop: 20 },
  chartTitle: { color: 'white', fontSize: 16, marginBottom: 20 },
  progressCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 4, justifyContent: 'center', alignItems: 'center' },
  percentText: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  gridItem: { backgroundColor: '#1A1A1A', width: '31%', padding: 20, borderRadius: 18, alignItems: 'center' },
  gridNum: { fontSize: 22, fontWeight: 'bold' },
  gridLabel: { color: '#666', fontSize: 12, marginTop: 5 }
});
