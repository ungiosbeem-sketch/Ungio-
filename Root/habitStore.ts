import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { Habit, HabitCompletion } from '@/types';

interface HabitState {
  habits: Habit[];
  completions: HabitCompletion[];
  loading: boolean;
  fetchHabits: () => Promise<void>;
  fetchCompletions: (dateRange?: { start: string; end: string }) => Promise<void>;
  createHabit: (habit: Omit<Habit, 'id' | 'user_id' | 'created_at'>) => Promise<Habit | null>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>;
  getStreak: (habitId: string) => number;
  isHabitCompletedOnDate: (habitId: string, date: string) => boolean;
}

export const useHabitStore = create<HabitState>((set, get) => ({
  habits: [],
  completions: [],
  loading: false,

  fetchHabits: async () => {
    set({ loading: true });
    const { data } = await supabase.from('habits').select('*').order('created_at', { ascending: true });
    set({ habits: data || [], loading: false });
  },

  fetchCompletions: async (dateRange) => {
    let query = supabase.from('habit_completions').select('*');
    if (dateRange) query = query.gte('completed_at', dateRange.start).lte('completed_at', dateRange.end);
    const { data } = await query.order('completed_at', { ascending: false });
    set({ completions: data || [] });
  },

  createHabit: async (habit) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return null;
    const { data } = await supabase.from('habits').insert({ ...habit, user_id: user.id }).select().maybeSingle();
    if (data) set((s) => ({ habits: [...s.habits, data] }));
    return data;
  },

  updateHabit: async (id, updates) => {
    await supabase.from('habits').update(updates).eq('id', id);
    set((s) => ({ habits: s.habits.map((h) => (h.id === id ? { ...h, ...updates } : h)) }));
  },

  deleteHabit: async (id) => {
    await supabase.from('habits').delete().eq('id', id);
    set((s) => ({ habits: s.habits.filter((h) => h.id !== id) }));
  },

  toggleHabitCompletion: async (habitId, date) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const existing = get().completions.find((c) => c.habit_id === habitId && c.completed_at === date);
    if (existing) {
      await supabase.from('habit_completions').delete().eq('id', existing.id);
      set((s) => ({ completions: s.completions.filter((c) => c.id !== existing.id) }));
    } else {
      const { data } = await supabase.from('habit_completions').insert({ habit_id: habitId, user_id: user.id, completed_at: date }).select().maybeSingle();
      if (data) set((s) => ({ completions: [data, ...s.completions] }));
    }
  },

  getStreak: (habitId) => {
    const dates = get().completions.filter((c) => c.habit_id === habitId).map((c) => c.completed_at).sort().reverse();
    if (dates.length === 0) return 0;
    let streak = 1;
    const today = new Date();
    const latest = new Date(dates[0]);
    if (Math.floor((today.getTime() - latest.getTime()) / 86400000) > 1) return 0;
    for (let i = 1; i < dates.length; i++) {
      const diff = Math.floor((new Date(dates[i - 1]).getTime() - new Date(dates[i]).getTime()) / 86400000);
      if (diff === 1) streak++; else break;
    }
    return streak;
  },

  isHabitCompletedOnDate: (habitId, date) => get().completions.some((c) => c.habit_id === habitId && c.completed_at === date),
}));
