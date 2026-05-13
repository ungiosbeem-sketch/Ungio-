import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';
import { theme } from '../../theme';

export default function ContactsScreen() {
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.from('profiles').select('*');
      if (data) setProfiles(data);
    };
    fetchProfiles();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contacts</Text>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem}>
            <Image source={{ uri: item.avatar_url || 'https://via.placeholder.com/50' }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.full_name || 'User'}</Text>
              <Text style={styles.username}>@{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#111', padding: 10, borderRadius: 12 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  username: { color: '#666', fontSize: 14 }
});

