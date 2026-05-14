import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { Task, TaskCategory, Priority, TaskStatus } from '@/types';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  filter: { category: TaskCategory | 'all'; status: TaskStatus | 'all'; priority: Priority | 'all' };
  searchQuery: string;
  setFilter: (filter: Partial<TaskState['filter']>) => void;
  setSearchQuery: (query: string) => void;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Task | null>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  getFilteredTasks: () => Task[];
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  filter: { category: 'all', status: 'all', priority: 'all' },
  searchQuery: '',
  setFilter: (filter) => set((s) => ({ filter: { ...s.filter, ...filter } })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  fetchTasks: async () => {
    set({ loading: true });
    const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false });
    set({ tasks: data || [], loading: false });
  },

  createTask: async (task) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return null;
    const { data } = await supabase.from('tasks').insert({ ...task, user_id: user.id }).select().maybeSingle();
    if (data) set((s) => ({ tasks: [data, ...s.tasks] }));
    return data;
  },

  updateTask: async (id, updates) => {
    await supabase.from('tasks').update(updates).eq('id', id);
    set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)) }));
  },

  deleteTask: async (id) => {
    await supabase.from('tasks').delete().eq('id', id);
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }));
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;
    const isCompleted = task.status === 'completed';
    const updates: Partial<Task> = {
      status: isCompleted ? 'pending' : 'completed',
      completed_at: isCompleted ? null : new Date().toISOString(),
    };
    await get().updateTask(id, updates);
  },

  getFilteredTasks: () => {
    const { tasks, filter, searchQuery } = get();
    return tasks.filter((t) => {
      if (filter.category !== 'all' && t.category !== filter.category) return false;
      if (filter.status !== 'all' && t.status !== filter.status) return false;
      if (filter.priority !== 'all' && t.priority !== filter.priority) return false;
      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  },
}));
