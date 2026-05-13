// app/auth/login.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useRouter } from 'expo-router';
import { useAuth } from '../../store/AuthContext'; // Context-ga aan hore u samaynay

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  
  // State-ka lagu xajiyo qoraalka uu qofku qorayo
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email.trim() === '') return; // Haddii uu eber yahay ha shaqayn

    setLoading(true);
    
    // Waxaan jilaynaa inay qaadanayso 1 ilbiriqsi si loo hubiyo xogta
    setTimeout(() => {
      login({ name: 'Abdalla Keynan', email: email });
      setLoading(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Ku soo Dhawaaw</Text>
        <Text style={styles.subtitle}>Fadlan gal xogtaada si aad u bilowdo chat-ka.</Text>
      </View>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Email" 
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail} // Tani waxay kaydinaysaa waxaad qorto
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TouchableOpacity 
          style={[styles.button, { opacity: email.length > 0 ? 1 : 0.6 }]}
          onPress={handleLogin}
          disabled={loading || email.length === 0}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Soo gal</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  headerSection: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
    padding: theme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    height: 55,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
