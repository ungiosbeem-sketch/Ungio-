// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ChatsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Tusaale dadka lala hadlay (Mustaqbalka database ayaa laga soo akhrin doonaa)
  const allChats = [
    { id: '1', name: 'Abdalla Keynan', lastMessage: 'Maanta app-ka ma dhamaystiraa?', time: '12:30 PM' },
    { id: '2', name: 'Software Team', lastMessage: 'Update-ka cusub soo dir.', time: '11:15 AM' },
    { id: '3', name: 'Ahmed Ali', lastMessage: 'Asc walaal.', time: 'Yesterday' },
    { id: '4', name: 'Sahra Blue', lastMessage: 'Sawirka ma aragtay?', time: 'Monday' },
  ];

  // Logic-ga lagu kala shaandheeyo (Filter) dadka
  const filteredChats = allChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Raadi qof..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => router.push(`/chat/${item.id}`)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.message} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
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
  searchSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 45,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  chatInfo: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.border,
    paddingBottom: 15,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    color: theme.colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  time: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  message: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
    
