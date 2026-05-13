import React, { useState } from 'react';
import { 
  View, 
  FlatList, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  Image,
  ActivityIndicator 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../../lib/supabase';
import { useChat } from '../../store/ChatContext';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const { messages, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');
  const [uploading, setUploading] = useState(false);

  // 1. Dirista Qoraalka
  const handleSendText = () => {
    if (inputText.trim()) {
      sendMessage(inputText, 'text');
      setInputText('');
    }
  };

  // 2. Dirista Sawirka
  const pickImageAndSend = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      try {
        setUploading(true);
        const filePath = `chat/${Date.now()}.png`;
        
        // Upload gareynta Storage-ka
        const { error } = await supabase.storage
          .from('avatars') 
          .upload(filePath, decode(result.assets[0].base64), { contentType: 'image/png' });

        if (error) throw error;

        // Soo qaadashada Link-iga sawirka
        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        
        // Fariin ahaan u dir
        sendMessage(data.publicUrl, 'image');
      } catch (err) {
        console.error("Upload error:", err);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isMe ? styles.myMessage : styles.theirMessage]}>
            {item.type === 'image' ? (
              <Image source={{ uri: item.image_url }} style={styles.chatImage} />
            ) : (
              <Text style={styles.messageText}>{item.text}</Text>
            )}
            <Text style={styles.timeText}>
              {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImageAndSend} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <Ionicons name="add-circle" size={32} color={theme.colors.primary} />
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Farriin qor..."
          placeholderTextColor="#666"
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSendText}>
          <Ionicons name="send" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  listContent: { padding: 20 },
  messageBubble: { padding: 10, borderRadius: 15, marginBottom: 10, maxWidth: '85%' },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#3b82f6' },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#262626' },
  messageText: { color: '#fff', fontSize: 16 },
  chatImage: { width: 200, height: 200, borderRadius: 10 },
  timeText: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#121212', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 20, paddingHorizontal: 15, height: 40, marginHorizontal: 10 },
  sendButton: { backgroundColor: '#3b82f6', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }
});
        
