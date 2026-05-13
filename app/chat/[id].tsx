// app/chat/[id].tsx
import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useChat } from '../../store/ChatContext';
import MessageBubble from '../../components/MessageBubble';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams();
  const { messages, sendMessage } = useChat();
  const [inputText, setInputText] = useState('');

  // 1. Shaqada fariinta qoraalka ah
  const handleSend = () => {
    if (inputText.trim().length > 0) {
      sendMessage(inputText, 'text');
      setInputText('');
    }
  };

  // 2. Shaqada sawirka (Jilitaanka)
  const handlePickImage = () => {
    // Maadaama aynaan terminal haysan, waxaan jilaynaa sawir la soo doortay
    const dummyImage = `https://picsum.photos/seed/${Math.random()}/400/300`; 
    sendMessage(dummyImage, 'image');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen options={{ title: `User ${id}` }} />
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble 
            text={item.text} 
            image={item.image} 
            type={item.type} 
            isMe={item.isMe} 
            time={item.time} 
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Input Section - Halkan ayaa isbeddelka ugu weyn ku dhacay */}
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handlePickImage} style={styles.attachButton}>
          <Ionicons name="add-circle-outline" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder="Farriin qor..."
          placeholderTextColor={theme.colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline={false}
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: inputText.trim().length > 0 ? 1 : 0.7 }]} 
          onPress={handleSend}
          disabled={inputText.trim().length === 0}
        >
          <Ionicons name="send" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    padding: theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingBottom: Platform.OS === 'ios' ? 30 : theme.spacing.md, // Correction for iOS
  },
  attachButton: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
