import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';

const Stack = createNativeStackNavigator();

// --- 1. BOGGA KOOWAAD (HOME) ---
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.greeting}>Ku soo dhowaw,</Text>
            <Text style={styles.userName}>Abdalla Keynan</Text>
          </View>

          <View style={styles.glassCard}>
            <Text style={styles.cardTitle}>DASHBOARD-KA UNGIO</Text>
            <View style={styles.statsRow}>
              <View>
                <Text style={styles.statsNumber}>85%</Text>
                <Text style={styles.statsLabel}>Project Progress</Text>
              </View>
              <View style={styles.verticalLine} />
              <View>
                <Text style={styles.statsNumber}>Active</Text>
                <Text style={styles.statsLabel}>Status</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Maareynta App-ka</Text>

          <TouchableOpacity 
            style={styles.goldButton} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Details')}
          >
            <Text style={styles.goldButtonText}>Eeg Faahfaahinta</Text>
          </TouchableOpacity>

          <View style={styles.listItem}>
            <View style={styles.iconPlaceholder} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Supabase Database</Text>
              <Text style={styles.itemSub}>Connected & Ready</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// --- 2. BOGGA LABAAD (DETAILS) ---
function DetailsScreen({ navigation }) {
  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
      <View style={styles.glassCard}>
        <Text style={styles.userName}>Xogta Supabase</Text>
        <Text style={[styles.itemSub, {marginTop: 10, textAlign: 'center'}]}>
          Halkan waxaa lagu soo bandhigi doonaa xogta laga soo aqriyo database-kaaga.
        </Text>
        
        <TouchableOpacity 
          style={[styles.goldButton, { marginTop: 30 }]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goldButtonText}>Dib u Noqo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- 3. QAABKA ISKU XIRKA (MAIN NAVIGATION) ---
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- 4. STYLE-KA (DHAMMAAN MUUQAALKA) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  safeArea: { flex: 1 },
  scrollContent: { padding: 20 },
  header: { marginTop: 20, marginBottom: 30 },
  greeting: { color: '#888', fontSize: 16 },
  userName: { color: '#FFD700', fontSize: 28, fontWeight: 'bold' },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '600', marginTop: 30, marginBottom: 15 },
  glassCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    borderRadius: 24, padding: 24, borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.15)', width: '100%' 
  },
  cardTitle: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 12, marginBottom: 16, letterSpacing: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statsNumber: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statsLabel: { color: '#888', fontSize: 11, marginTop: 4 },
  verticalLine: { width: 1, height: 35, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  goldButton: { backgroundColor: '#FFD700', padding: 18, borderRadius: 16, alignItems: 'center', width: '100%' },
  goldButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  listItem: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.04)', 
    padding: 16, borderRadius: 18, marginTop: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' 
  },
  iconPlaceholder: { width: 45, height: 45, borderRadius: 12, backgroundColor: '#FFD700' },
  itemTextContainer: { marginLeft: 16 },
  itemTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  itemSub: { color: '#666', fontSize: 13 }
});
    
