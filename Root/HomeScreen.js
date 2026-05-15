import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Marka boga la furo, soo jiid xogta
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTasks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header-ka sare */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Assalaamu calaykum,</Text>
          <Text style={styles.userName}>Abdalla Keynan</Text>
        </View>
        <TouchableOpacity style={styles.notifButton}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFD700" />}
      >
        
        {/* Progress Card (Quruxda Dahabiga ah) */}
        <View style={styles.progressCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.progressTitle}>Daily Progress</Text>
            <Text style={styles.progressSub}>You have completed {tasks.length > 0 ? '75%' : '0%'} of your tasks.</Text>
          </View>
          <View style={styles.percentageCircle}>
            <Text style={styles.percentageText}>75%</Text>
          </View>
        </View>

        {/* Qaybta Recent Tasks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
        ) : tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={50} color="#333" />
            <Text style={styles.emptyText}>Ma jirto hawl kuu qoran hadda.</Text>
          </View>
        ) : (
          tasks.map((item) => (
            <View key={item.id} style={styles.taskCard}>
              <View style={styles.taskInfo}>
                <Ionicons 
                  name={item.status === 'completed' ? "checkmark-circle" : "ellipse-outline"} 
                  size={24} 
                  color={item.status === 'completed' ? "#4CAF50" : "#FFD700"} 
                />
                <View style={styles.taskTexts}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <Text style={styles.taskTime}>Today, 10:00 AM</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          ))
        )}

      </ScrollView>

      {/* Floating Action Button (FAB) - Jaalle ah */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Ionicons name="add" size={35} color="black" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black Background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#888',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  notifButton: {
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 12,
  },
  notifDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: '#FFD700',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  progressCard: {
    backgroundColor: '#4A90E2', // Blue Card sidii sawirka
    borderRadius: 24,
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 5,
  },
  percentageCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'white', // Creating a progress effect
  },
  percentageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#4A90E2',
    fontSize: 14,
  },
  taskCard: {
    backgroundColor: '#1A1A1A',
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTexts: {
    marginLeft: 15,
  },
  taskTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  taskTime: {
    color: '#555',
    fontSize: 12,
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#555',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 25,
    backgroundColor: '#FFD700', // Gold FAB
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  }
});
