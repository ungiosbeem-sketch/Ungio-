import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Statistics</Text>
      
      <ScrollView style={{padding: 20}}>
        <View style={styles.chartBox}>
          <Text style={styles.chartTitle}>Hawlaha la dhammeeyay</Text>
          <View style={styles.progressCircle}>
             <Text style={styles.percentText}>75%</Text>
             <Text style={{color: '#888', fontSize: 12}}>12 / 16</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.gridItem}><Text style={styles.gridNum}>16</Text><Text style={styles.gridLabel}>Dhammaan</Text></View>
          <View style={styles.gridItem}><Text style={styles.gridNum}>12</Text><Text style={styles.gridLabel}>Dhammeeyay</Text></View>
          <View style={styles.gridItem}><Text style={styles.gridNum}>4</Text><Text style={styles.gridLabel}>Hadhay</Text></View>
        </View>

        <View style={styles.streakBox}>
           <Ionicons name="flame" size={30} color="#FFD700" />
           <Text style={styles.streakText}>7 maalmood oo xiriir ah!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', paddingHorizontal: 20 },
  chartBox: { backgroundColor: '#1E1E1E', padding: 25, borderRadius: 20, alignItems: 'center', marginTop: 20 },
  chartTitle: { color: 'white', marginBottom: 20 },
  progressCircle: { width: 120, height: 120, borderRadius: 60, borderStyle: 'dotted', borderWidth: 3, borderColor: '#FFD700', justifyContent: 'center', alignItems: 'center' },
  percentText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  gridItem: { backgroundColor: '#1E1E1E', width: '31%', padding: 15, borderRadius: 15, alignItems: 'center' },
  gridNum: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  gridLabel: { color: '#666', fontSize: 10, marginTop: 5 },
  streakBox: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center' },
  streakText: { color: 'white', marginLeft: 10, fontWeight: '500' }
});
