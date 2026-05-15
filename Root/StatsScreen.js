import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statBox}>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Total Tasks</Text>
            <Text style={styles.statNumber}>24</Text>
          </View>
          <Ionicons name="list" size={30} color="#4A90E2" />
        </View>

        <View style={[styles.statBox, { backgroundColor: '#E8F5E9' }]}>
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Completed</Text>
            <Text style={styles.statNumber}>18</Text>
          </View>
          <Ionicons name="checkmark-done" size={30} color="#4CAF50" />
        </View>

        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Weekly Activity View</Text>
          <View style={styles.barContainer}>
            {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
              <View key={i} style={[styles.bar, { height: h }]} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  content: { padding: 20 },
  statBox: { backgroundColor: '#E3F2FD', padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  statLabel: { fontSize: 14, color: '#666' },
  statNumber: { fontSize: 24, fontWeight: 'bold', marginTop: 5 },
  chartPlaceholder: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginTop: 10, alignItems: 'center' },
  placeholderText: { fontSize: 16, fontWeight: '500', marginBottom: 20 },
  barContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 100, gap: 10 },
  bar: { width: 15, backgroundColor: '#4A90E2', borderRadius: 5 }
});
