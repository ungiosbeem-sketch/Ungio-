import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase';
import { theme } from '../../theme';
import { decode } from 'base64-arraybuffer'; // Ku dar kani: npx expo install base64-arraybuffer

export default function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/150');

  // 1. Sawir xulashada (Pick Image)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      uploadAvatar(result.assets[0].base64);
    }
  };

  // 2. Upload gareynta Supabase Storage
  const uploadAvatar = async (base64: string) => {
    try {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      const filePath = `${user?.id}/${Math.random()}.png`;

      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, decode(base64), { contentType: 'image/png' });

      if (error) throw error;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);
      Alert.alert("Guul!", "Sawirka waa la soo geliyay.");
    } catch (error: any) {
      Alert.alert("Upload Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={{ color: theme.colors.primary, marginTop: 10 }}>Beddel Sawirka</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#666"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Profile Updated!")}>
        <Text style={styles.buttonText}>Keydi Isbeddelka</Text>
      </TouchableOpacity>
      
      {loading && <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loader} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', padding: 20 },
  avatar: { width: 150, height: 150, borderRadius: 75, borderWidth: 2, borderColor: '#333' },
  input: { width: '100%', backgroundColor: '#111', color: '#fff', padding: 15, borderRadius: 10, marginTop: 30 },
  button: { backgroundColor: '#3b82f6', width: '100%', padding: 15, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  loader: { position: 'absolute', top: '50%' }
});
