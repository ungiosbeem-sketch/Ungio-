import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import { theme } from '../theme';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, full_name, avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) throw error;

        if (data) {
          setUsername(data.username || '');
          setFullName(data.full_name || '');
          setAvatarUrl(data.avatar_url || 'https://via.placeholder.com/150');
        }
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      const updates = {
        id: user?.id,
        username,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      Alert.alert('Guul!', 'Profile-kaaga waa la cusboonaysiiyay.');
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      
      <TextInput
        style={styles.input}
        placeholder="Username (e.g. abdalla123)"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Magacaaga oo buuxa"
        placeholderTextColor="#666"
        value={fullName}
        onChangeText={setFullName}
      />

      <TouchableOpacity 
        style={[styles.button, { opacity: loading ? 0.7 : 1 }]} 
        onPress={updateProfile}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>Cusboonaysii Profile-ka</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: theme.colors.background, alignItems: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2, borderColor: theme.colors.primary },
  input: { width: '100%', backgroundColor: theme.colors.card, color: '#fff', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: theme.colors.primary, padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonText: { fontWeight: 'bold', fontSize: 16, color: '#000' }
});
          
