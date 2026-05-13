// app/(tabs)/index.tsx
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../../theme';

export default function ChatsScreen() {
  // Tusaale xog ah (Dummy data)
  const chats = [
    { id: '1', name: 'Abdalla Keynan', lastMessage: 'Maanta app-ka ma dhamaystiraa?' },
    { id: '2', name: 'Software Team', lastMessage: 'Update-ka cusub soo dir.' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.lastMessage}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  chatItem: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.card,
    marginRight: theme.spacing.md,
  },
  name: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
