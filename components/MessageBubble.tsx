// components/MessageBubble.tsx
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';

interface MessageProps {
  text?: string;
  image?: string;
  type: 'text' | 'image';
  isMe: boolean;
  time: string;
}

export default function MessageBubble({ text, image, type, isMe, time }: MessageProps) {
  return (
    <View style={[styles.container, isMe ? styles.myMessage : styles.theirMessage]}>
      {type === 'image' ? (
        <Image source={{ uri: image }} style={styles.messageImage} resizeMode="cover" />
      ) : (
        <Text style={[styles.text, { color: isMe ? '#000' : '#fff' }]}>{text}</Text>
      )}
      <Text style={[styles.time, { color: isMe ? 'rgba(0,0,0,0.5)' : theme.colors.textSecondary }]}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderRadius: 16, marginBottom: 8, maxWidth: '80%' },
  myMessage: { backgroundColor: theme.colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  theirMessage: { backgroundColor: theme.colors.card, alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  text: { fontSize: 16 },
  messageImage: { width: 200, height: 150, borderRadius: 10, marginBottom: 5 },
  time: { fontSize: 10, marginTop: 4, textAlign: 'right' },
});
