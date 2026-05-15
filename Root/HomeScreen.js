import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Ungio Planner</Text>
          <Text style={styles.subTitle}>Maamul hawlahaaga, Abdalla</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity><Ionicons name="notifications-outline" size={24} color="white" /></TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 15}}><Ionicons name="moon-outline" size={24} color="white" /></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{padding: 20}}>
        {/* Quick Add Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.placeholderText}>Maxaad qorshaynaysaa?</Text>
          <TouchableOpacity style={styles.addButtonSmall}>
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards Row */}
        <View style={styles.statsRow}>
          <StatCard title="Wadarta" count="16" icon="list" color="#FFD700" />
          <StatCard title="Dhammeeyay" count="12" icon="checkmark-done" color="#4CAF50" />
          <StatCard title="Hadhay" count="4" icon="time" color="#FF5252" />
        </View>

        {/* Task Section */}
        <Text style={styles.sectionTitle}>Hawlaha Maanta</Text>
        
        <TaskItem title="Quraan akhris" time="06:00 AM" category="Study" priority="High" />
        <TaskItem title="Wax akhris" time="04:00 PM" category="Study" priority="Medium" />
        <TaskItem title="Dhar dhaqid" time="07:00 PM" category="Personal" priority="Low" />

      </ScrollView>

      {/* Custom Bottom Tab (Dabaqa hoose) */}
      <View style={styles.bottomTab}>
        <TabIcon name="home" label="Home" active />
        <TabIcon name="calendar" label="Calendar" />
        <TouchableOpacity style={styles.mainFab} onPress={() => navigation.navigate('AddTask')}>
           <Ionicons name="add" size={35} color="black" />
        </TouchableOpacity>
        <TabIcon name="bar-chart" label="Stats" />
        <TabIcon name="person" label="Profile" />
      </View>
    </SafeAreaView>
  );
}

// Components yaryar oo koodhka nidaamiya
const StatCard = ({ title, count, icon, color }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={20} color={color} />
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{title}</Text>
  </View>
);

const TaskItem = ({ title, time, category, priority }) => (
  <View style={styles.taskCard}>
    <View style={styles.taskInfo}>
      <View style={[styles.priorityDot, {backgroundColor: priority === 'High' ? '#FFD700' : '#888'}]} />
      <View>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDetails}>{time} • {category}</Text>
      </View>
    </View>
    <TouchableOpacity><Ionicons name="square-outline" size={24} color="#555" /></TouchableOpacity>
  </View>
);

const TabIcon = ({ name, label, active }) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons name={name} size={22} color={active ? '#FFD700' : '#888'} />
    <Text style={[styles.tabLabel, {color: active ? '#FFD700' : '#888'}]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40 },
  appTitle: { color: '#FFD700', fontSize: 24, fontWeight: 'bold' },
  subTitle: { color: '#888', fontSize: 13 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  searchBar: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  placeholderText: { color: '#555' },
  addButtonSmall: { backgroundColor: '#FFD700', borderRadius: 8, padding: 5 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  statCard: { backgroundColor: '#1E1E1E', width: '30%', padding: 15, borderRadius: 15, alignItems: 'center' },
  statCount: { color: 'white', fontSize: 18, fontWeight: 'bold', marginVertical: 5 },
  statLabel: { color: '#888', fontSize: 11 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  taskCard: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  taskInfo: { flexDirection: 'row', alignItems: 'center' },
  priorityDot: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  taskTitle: { color: 'white', fontSize: 16, fontWeight: '500' },
  taskDetails: { color: '#666', fontSize: 12, marginTop: 2 },
  bottomTab: { flexDirection: 'row', backgroundColor: '#121212', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#333', justifyContent: 'space-around', alignItems: 'center' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, marginTop: 4 },
  mainFab: { backgroundColor: '#FFD700', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: -30, elevation: 5 }
});
          
