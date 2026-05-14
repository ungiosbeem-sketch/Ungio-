import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { Goal } from '@/types';

interface GoalState {
  goals: Goal[];
  loading: boolean;
  fetchGoals: () => Promise<void>;
  createGoal: (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Goal | null>;
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  updateProgress: (id: string, progress: number) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],
  loading: false,

  fetchGoals: async () => {
    set({ loading: true });
    const { data } = await supabase.from('goals').select('*').order('created_at', { ascending: false });
    set({ goals: data || [], loading: false });
  },

  createGoal: async (goal) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return null;
    const { data } = await supabase.from('goals').insert({ ...goal, user_id: user.id }).select().maybeSingle();
    if (data) set((s) => ({ goals: [data, ...s.goals] }));
    return data;
  },

  updateGoal: async (id, updates) => {
    await supabase.from('goals').update(updates).eq('id', id);
    set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)) }));
  },

  deleteGoal: async (id) => {
    await supabase.from('goals').delete().eq('id', id);
    set((s) => ({ goals: s.goals.filter((g) => g.id !== id) }));
  },

  updateProgress: async (id, progress) => {
    const goal = get().goals.find((g) => g.id === id);
    if (!goal) return;
    const isCompleted = progress >= goal.target;
    await get().updateGoal(id, { progress, is_completed: isCompleted });
  },
}));
