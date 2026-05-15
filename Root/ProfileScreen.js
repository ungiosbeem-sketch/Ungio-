import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}><Text style={styles.avatarTxt}>A</Text></View>
        <Text style={styles.name}>Abdalla</Text>
        <Text style={styles.email}>abdalla@example.com</Text>
      </View>

      <View style={styles.menuList}>
        <MenuItem icon="settings-outline" title="Habeynta" />
        <MenuItem icon="moon-outline" title="Mawduuca" value="Dark" />
        <MenuItem icon="notifications-outline" title="Xusuusinta" />
        <MenuItem icon="information-circle-outline" title="Ku saabsan app-ka" />
      </View>

      <TouchableOpacity style={styles.logout}>
        <Text style={{color: '#FF5252', fontWeight: 'bold'}}>Ka bax</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const MenuItem = ({ icon, title, value }) => (
  <TouchableOpacity style={styles.item}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Ionicons name={icon} size={22} color="#FFD700" />
      <Text style={styles.itemTxt}>{title}</Text>
    </View>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {value && <Text style={{color: '#666', marginRight: 10}}>{value}</Text>}
      <Ionicons name="chevron-forward" size={18} color="#333" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderStyle: 'solid', borderWidth: 2, borderColor: '#FFD700' },
  avatarTxt: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  name: { color: 'white', fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  email: { color: '#666' },
  menuList: { padding: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 0.5, borderBottomColor: '#1E1E1E' },
  itemTxt: { color: 'white', marginLeft: 15, fontSize: 16 },
  logout: { marginTop: 'auto', marginBottom: 40, alignItems: 'center' }
});
