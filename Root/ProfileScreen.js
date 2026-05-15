import React from 'react';
import { 
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, 
  Image, ScrollView, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  // Waxaad halkan ku beddelan kartaa xogtaada dhabta ah
  const user = {
    name: "Abdalla Keynan",
    title: "Software Engineer",
    tasksCompleted: 48,
    rank: "Pro Planner"
  };

  const menuItems = [
    { icon: 'settings-outline', label: 'Settings', color: '#fff' },
    { icon: 'notifications-outline', label: 'Notifications', color: '#fff' },
    { icon: 'shield-checkmark-outline', label: 'Privacy & Security', color: '#fff' },
    { icon: 'help-circle-outline', label: 'Help Center', color: '#fff' },
    { icon: 'log-out-outline', label: 'Log Out', color: '#FF4444' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={50} color="#FFD700" />
            </View>
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="#000" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userTitle}>{user.title}</Text>
          
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{user.rank}</Text>
            </View>
          </View>
        </View>

        {/* Stats Summary Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.tasksCompleted}</Text>
            <Text style={styles.statLabel}>Tasks Done</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={22} color={item.color} />
                <Text style={[styles.menuLabel, { color: item.color }]}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#222" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.versionText}>Ungio Pro v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  profileHeader: { alignItems: 'center', marginTop: 30, marginBottom: 30 },
  imageContainer: { marginBottom: 15 },
  profileImage: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFD700' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFD700', padding: 8, borderRadius: 15 },
  userName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  userTitle: { color: '#666', fontSize: 14, marginTop: 4 },
  badgeRow: { marginTop: 12 },
  badge: { backgroundColor: '#221a00', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: '#FFD700' },
  badgeText: { color: '#FFD700', fontSize: 12, fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', backgroundColor: '#111', marginHorizontal: 20, padding: 20, borderRadius: 25, justifyContent: 'space-around', alignItems: 'center' },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 12, marginTop: 2 },
  divider: { width: 1, height: 30, backgroundColor: '#222' },
  menuContainer: { marginTop: 30, paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#111' },
  menuIconContainer: { flexDirection: 'row', alignItems: 'center' },
  menuLabel: { marginLeft: 15, fontSize: 16, fontWeight: '500' },
  versionText: { color: '#222', textAlign: 'center', marginTop: 40, marginBottom: 100, fontSize: 12 }
});
    
