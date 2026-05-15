import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ghtpmdxehfuswwxjemyt.supabase.co';
const supabaseAnonKey = 'sb_publishable_YXOSNcMhtmNdkXwzZYS0oA_eKLcN6HL';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
