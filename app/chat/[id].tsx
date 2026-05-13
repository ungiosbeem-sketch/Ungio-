// app/chat/[id].tsx
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import MessageBubble from '../../components/MessageBubble';

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams(); // Halkan waxaa ku jira ID-ga qofka

  // Tusaale fariimo ah
  const messages = [
    { id: '1', text: 'Sidee tahay saaxiib?', isMe: false, time: '10:00 AM' },
    { id: '2', text: 'Waan fiicanahay, mashruucii ma dhamaysay?', isMe: true, time: '10:02 AM' },
    { id: '3', text: 'Haa, haddaan GitHub u diray.', isMe: false, time: '10:05 AM' },
  ];

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Stack.Screen options={{ title: `User ${id}`, headerTitleAlign: 'center' }} />
      
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble text={item.text} isMe={item.isMe} time={item.time} />
        )}
        contentContainerStyle={styles.listContent}
      />

      {/* Input-ka hoose ee fariinta laga diro */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Farriin qor..."
          placeholderTextColor={theme.colors.textSecondary}
        />
        <TouchableOpacity style={styles.sendButton}>
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
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
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
