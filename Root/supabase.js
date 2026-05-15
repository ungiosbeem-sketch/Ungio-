import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Macluumaadkaaga rasmiga ah ee Supabase
const supabaseUrl = 'https://ghtpmdxehfuswwxjemyt.supabase.co';
const supabaseAnonKey = 'Sb_publishable_YXOSNcMhtmNdkXwzZYS0oA_eKLcN6HL';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
