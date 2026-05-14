import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { FocusSession, FocusType } from '@/types';
import { FOCUS_DURATIONS } from '@/constants';

interface FocusState {
  sessions: FocusSession[];
  activeSession: FocusSession | null;
  timerSeconds: number;
  isRunning: boolean;
  selectedType: FocusType;
  loading: boolean;
  setTimerSeconds: (s: number) => void;
  setIsRunning: (r: boolean) => void;
  setSelectedType: (t: FocusType) => void;
  startSession: () => Promise<void>;
  completeSession: () => Promise<void>;
  cancelSession: () => Promise<void>;
  fetchSessions: () => Promise<void>;
  getTodayStats: () => { totalMinutes: number; completedSessions: number };
  getWeekStats: () => { totalMinutes: number; completedSessions: number; dailyAverage: number };
}

export const useFocusStore = create<FocusState>((set, get) => ({
  sessions: [],
  activeSession: null,
  timerSeconds: FOCUS_DURATIONS.pomodoro * 60,
  isRunning: false,
  selectedType: 'pomodoro',
  loading: false,
  setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setSelectedType: (selectedType) => set({ selectedType, timerSeconds: FOCUS_DURATIONS[selectedType] * 60, isRunning: false }),

  startSession: async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;
    const type = get().selectedType;
    const { data } = await supabase.from('focus_sessions').insert({ user_id: user.id, duration_minutes: FOCUS_DURATIONS[type], type, completed: false, started_at: new Date().toISOString() }).select().maybeSingle();
    if (data) set({ activeSession: data, isRunning: true, timerSeconds: FOCUS_DURATIONS[type] * 60 });
  },

  completeSession: async () => {
    const session = get().activeSession;
    if (!session) return;
    const { data } = await supabase.from('focus_sessions').update({ completed: true, ended_at: new Date().toISOString() }).eq('id', session.id).select().maybeSingle();
    if (data) set((s) => ({ sessions: [data, ...s.sessions], activeSession: null, isRunning: false }));
  },

  cancelSession: async () => {
    const session = get().activeSession;
    if (!session) return;
    await supabase.from('focus_sessions').update({ ended_at: new Date().toISOString() }).eq('id', session.id);
    set({ activeSession: null, isRunning: false });
  },

  fetchSessions: async () => {
    set({ loading: true });
    const { data } = await supabase.from('focus_sessions').select('*').order('created_at', { ascending: false }).limit(100);
    set({ sessions: data || [], loading: false });
  },

  getTodayStats: () => {
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = get().sessions.filter((s) => s.started_at.startsWith(today) && s.completed);
    return { totalMinutes: todaySessions.reduce((sum, s) => sum + s.duration_minutes, 0), completedSessions: todaySessions.length };
  },

  getWeekStats: () => {
    const weekAgo = new Date(Date.now() - 7 * 86400000);
    const weekSessions = get().sessions.filter((s) => new Date(s.started_at) >= weekAgo && s.completed);
    const totalMinutes = weekSessions.reduce((sum, s) => sum + s.duration_minutes, 0);
    return { totalMinutes, completedSessions: weekSessions.length, dailyAverage: Math.round(totalMinutes / 7) };
  },
}));
