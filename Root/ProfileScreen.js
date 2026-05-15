import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{width: 26}} />
      </View>

      <ScrollView contentContainerStyle={{alignItems: 'center', padding: 20}}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}><Text style={styles.avatarTxt}>A</Text></View>
          <TouchableOpacity style={styles.editBadge}>
            <Ionicons name="camera" size={16} color="black" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.name}>Abdalla Keynan</Text>
        <Text style={styles.bio}>Aspiring Software Engineer</Text>

        <View style={styles.menuCard}>
          <ProfileItem icon="settings-outline" title="Settings" />
          <ProfileItem icon="notifications-outline" title="Notifications" />
          <ProfileItem icon="shield-checkmark-outline" title="Privacy Policy" />
          <ProfileItem icon="help-circle-outline" title="Support" last />
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#FF5252" />
          <Text style={styles.logoutTxt}>Ka bax (Log Out)</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const ProfileItem = ({ icon, title, last }) => (
  <TouchableOpacity style={[styles.item, last && {borderBottomWidth: 0}]}>
    <View style={styles.itemLeft}>
      <View style={styles.iconBg}><Ionicons name={icon} size={20} color="#FFD700" /></View>
      <Text style={styles.itemTxt}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#333" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  avatarContainer: { marginTop: 10, marginBottom: 15 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFD700' },
  avatarTxt: { color: 'white', fontSize: 40, fontWeight: 'bold' },
  editBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#FFD700', padding: 6, borderRadius: 12 },
  name: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  bio: { color: '#666', marginTop: 5 },
  menuCard: { backgroundColor: '#1A1A1A', width: '100%', borderRadius: 20, marginTop: 30, paddingHorizontal: 15 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#333' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBg: { backgroundColor: 'rgba(255, 215, 0, 0.1)', padding: 8, borderRadius: 10 },
  itemTxt: { color: 'white', marginLeft: 15, fontSize: 16 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
  logoutTxt: { color: '#FF5252', marginLeft: 10, fontSize: 16, fontWeight: '600' }
});
              
