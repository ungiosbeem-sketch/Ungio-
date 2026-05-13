// components/MessageBubble.tsx
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface MessageProps {
  text: string;
  isMe: boolean;
  time: string;
}

export default function MessageBubble({ text, isMe, time }: MessageProps) {
  return (
    <View style={[styles.container, isMe ? styles.myMessage : styles.theirMessage]}>
      <Text style={[styles.text, { color: isMe ? '#000' : '#fff' }]}>{text}</Text>
      <Text style={[styles.time, { color: isMe ? 'rgba(0,0,0,0.5)' : theme.colors.textSecondary }]}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: theme.colors.primary, // Midabkaaga (Neon Green)
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: theme.colors.card,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
  },
  time: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
});
