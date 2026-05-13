// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme';
import { useAuth } from '../../store/AuthContext'; // Si aan u ogaano qofka soo galay
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/auth/login'); // Markuu baxo wuxuu ku noqonayaa Login
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {/* Profile Image Placeholder */}
        <View style={styles.avatar}>
           <Ionicons name="person" size={50} color={theme.colors.textSecondary} />
        </View>
        
        <Text style={styles.userName}>{user?.name || 'Abdalla Keynan'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'abdalla@example.com'}</Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Ka bax App-ka (Logout)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
  menuSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 69, 58, 0.1)', // Midab casaan khafiif ah
    borderRadius: 12,
  },
  logoutText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
});
