import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { Routine } from '@/types';

interface RoutineState {
  routines: Routine[];
  loading: boolean;
  fetchRoutines: () => Promise<void>;
  createRoutine: (routine: Omit<Routine, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Routine | null>;
  updateRoutine: (id: string, updates: Partial<Routine>) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
}

export const useRoutineStore = create<RoutineState>((set, get) => ({
  routines: [],
  loading: false,

  fetchRoutines: async () => {
    set({ loading: true });
    const { data } = await supabase.from('routines').select('*').order('sort_order', { ascending: true });
    set({ routines: data || [], loading: false });
  },

  createRoutine: async (routine) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return null;
    const maxOrder = get().routines.reduce((max, r) => Math.max(max, r.sort_order), -1);
    const { data } = await supabase.from('routines').insert({ ...routine, user_id: user.id, sort_order: maxOrder + 1 }).select().maybeSingle();
    if (data) set((s) => ({ routines: [...s.routines, data] }));
    return data;
  },

  updateRoutine: async (id, updates) => {
    await supabase.from('routines').update(updates).eq('id', id);
    set((s) => ({ routines: s.routines.map((r) => (r.id === id ? { ...r, ...updates } : r)) }));
  },

  deleteRoutine: async (id) => {
    await supabase.from('routines').delete().eq('id', id);
    set((s) => ({ routines: s.routines.filter((r) => r.id !== id) }));
  },
}));
