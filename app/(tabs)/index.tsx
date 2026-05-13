import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useChat } from '../../store/ChatContext'; // Hubi in ChatProvider uu ku duuban yahay _layout.tsx
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const { messages, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
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
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timeText}>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Farriin qor..."
          placeholderTextColor="#666"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  listContent: { padding: 20 },
  messageBubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#3b82f6' },
  theirMessage: { alignSelf: 'flex-start', backgroundColor: '#262626' },
  messageText: { color: '#fff', fontSize: 16 },
  timeText: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  inputContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#121212', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#1e1e1e', color: '#fff', borderRadius: 25, paddingHorizontal: 20, paddingVertical: 10, marginRight: 10 },
  sendButton: { backgroundColor: '#3b82f6', width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center' }
});
