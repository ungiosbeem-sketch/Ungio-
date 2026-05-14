import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { PlannerEvent } from '@/types';

interface PlannerState {
  events: PlannerEvent[];
  loading: boolean;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  fetchEvents: (startDate: string, endDate: string) => Promise<void>;
  createEvent: (event: Omit<PlannerEvent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<PlannerEvent | null>;
  updateEvent: (id: string, updates: Partial<PlannerEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEventsForDate: (date: string) => PlannerEvent[];
}

export const usePlannerStore = create<PlannerState>((set, get) => ({
  events: [],
  loading: false,
  selectedDate: new Date().toISOString().split('T')[0],
  setSelectedDate: (selectedDate) => set({ selectedDate }),

  fetchEvents: async (startDate, endDate) => {
    set({ loading: true });
    const { data } = await supabase.from('planner_events').select('*').gte('date', startDate).lte('date', endDate).order('start_time', { ascending: true });
    set({ events: data || [], loading: false });
  },

  createEvent: async (event) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return null;
    const { data } = await supabase.from('planner_events').insert({ ...event, user_id: user.id }).select().maybeSingle();
    if (data) set((s) => ({ events: [...s.events, data].sort((a, b) => a.start_time.localeCompare(b.start_time)) }));
    return data;
  },

  updateEvent: async (id, updates) => {
    await supabase.from('planner_events').update(updates).eq('id', id);
    set((s) => ({ events: s.events.map((e) => (e.id === id ? { ...e, ...updates } : e)) }));
  },

  deleteEvent: async (id) => {
    await supabase.from('planner_events').delete().eq('id', id);
    set((s) => ({ events: s.events.filter((e) => e.id !== id) }));
  },

  getEventsForDate: (date) => get().events.filter((e) => e.date === date),
}));
