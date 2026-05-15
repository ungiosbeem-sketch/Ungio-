import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>A</Text>
        </View>
        <Text style={styles.name}>Abdalla Keynan</Text>
        <Text style={styles.bio}>Software Engineer | Planner Enthusiast</Text>
      </View>

      <View style={styles.menu}>
        <ProfileMenuItem icon="settings-outline" title="Settings" />
        <ProfileMenuItem icon="shield-checkmark-outline" title="Privacy" />
        <ProfileMenuItem icon="help-circle-outline" title="Support" />
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ProfileMenuItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={22} color="#333" />
    <Text style={styles.menuText}>{title}</Text>
    <Ionicons name="chevron-forward" size={18} color="#CCC" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingVertical: 50, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#4A90E2', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  avatarLetter: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold' },
  bio: { color: '#888', marginTop: 5 },
  menu: { padding: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F9F9F9' },
  menuText: { flex: 1, marginLeft: 15, fontSize: 16 },
  logoutBtn: { marginTop: 30, alignItems: 'center' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '600' }
});

    
