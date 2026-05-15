import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Ku soo dhowaw,</Text>
            <Text style={styles.userName}>Abdalla Keynan</Text>
          </View>

          {/* Glassmorphism Card: Dashboard */}
          <View style={styles.glassCard}>
            <Text style={styles.cardTitle}>Heerka Shaqada</Text>
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.statsNumber}>85%</Text>
                <Text style={styles.statsLabel}>Dhammaystiran</Text>
              </View>
              <View style={styles.verticalLine} />
              <View>
                <Text style={styles.statsNumber}>12</Text>
                <Text style={styles.statsLabel}>Hawlo dhiman</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions Title */}
          <Text style={styles.sectionTitle}>Adeegyada Degdegga ah</Text>

          {/* Gold Action Button */}
          <TouchableOpacity style={styles.goldButton} activeOpacity={0.8}>
            <Text style={styles.goldButtonText}>Bilow Mashruuc Cusub</Text>
          </TouchableOpacity>

          {/* Glassmorphism List Item 1 */}
          <View style={styles.listItem}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Keynan Planner</Text>
              <Text style={styles.itemSub}>Mobile App Development</Text>
            </View>
            <Text style={styles.itemStatus}>Active</Text>
          </View>

          {/* Glassmorphism List Item 2 */}
          <View style={styles.listItem}>
            <View style={[styles.iconPlaceholder, {backgroundColor: '#444'}]} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Ciyaarta Chess-ka</Text>
              <Text style={styles.itemSub}>Maanta 4:00 PM</Text>
            </View>
            <Text style={[styles.itemStatus, {color: '#888'}]}>Pending</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a', // Madow qoto dheer
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  greeting: {
    color: '#888',
    fontSize: 16,
  },
  userName: {
    color: '#FFD700', // Dahab
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 15,
  },
  // Glassmorphism Design
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statsNumber: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  statsLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  verticalLine: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  goldButton: {
    backgroundColor: '#FFD700',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  goldButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 16,
    borderRadius: 18,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFD700',
  },
  itemTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemSub: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
  itemStatus: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  }
});
            
