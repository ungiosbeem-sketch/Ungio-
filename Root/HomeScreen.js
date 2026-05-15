import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from './supabase';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Tusaale ahaan xogta laga soo jiidato Supabase
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .limit(5);
      
      if (data) setTasks(data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header-ka sare */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Assalaamu calaykum,</Text>
          <Text style={styles.userName}>Abdalla Keynan</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Progress Card (Bedelkii Circular Progress-ka) */}
        <View style={styles.progressCard}>
          <View>
            <Text style={styles.progressTitle}>Daily Progress</Text>
            <Text style={styles.progressSub}>You have completed 75% of your tasks.</Text>
          </View>
          <View style={styles.percentageCircle}>
            <Text style={styles.percentageText}>75%</Text>
          </View>
        </View>

        {/* Qaybta Hawlaha (Tasks Section) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
        ) : (
          tasks.map((item, index) => (
            <View key={index} style={styles.taskItem}>
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
              <View style={styles.taskInfo}>
                <Text style={styles.taskText}>{item.title || 'New Task'}</Text>
                <Text style={styles.taskTime}>Today, 10:00 AM</Text>
              </View>
            </View>
          ))
        )}

      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  scrollContent: {
    padding: 20,
  },
  progressCard: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
  },
  progressTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressSub: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 5,
  },
  percentageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  percentageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#4A90E2',
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskInfo: {
    marginLeft: 15,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskTime: {
    fontSize: 12,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#4A90E2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  }
});
