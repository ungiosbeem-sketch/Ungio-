import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { Note } from '@/types';

interface NoteState {
  notes: Note[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  fetchNotes: () => Promise<void>;
  createNote: (note: Omit<Note, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<Note | null>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  togglePin: (id: string) => Promise<void>;
  getFilteredNotes: () => Note[];
}

export const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  loading: false,
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  fetchNotes: async () => {
    set({ loading: true });
    const { data } = await supabase.from('notes').select('*').order('is_pinned', { ascending: false }).order('updated_at', { ascending: false });
    set({ notes: data || [], loading: false });
  },

  createNote: async (note) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return null;
    const { data } = await supabase.from('notes').insert({ ...note, user_id: user.id }).select().maybeSingle();
    if (data) set((s) => ({ notes: [data, ...s.notes] }));
    return data;
  },

  updateNote: async (id, updates) => {
    await supabase.from('notes').update(updates).eq('id', id);
    set((s) => ({ notes: s.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)) }));
  },

  deleteNote: async (id) => {
    await supabase.from('notes').delete().eq('id', id);
    set((s) => ({ notes: s.notes.filter((n) => n.id !== id) }));
  },

  togglePin: async (id) => {
    const note = get().notes.find((n) => n.id === id);
    if (!note) return;
    await get().updateNote(id, { is_pinned: !note.is_pinned });
  },

  getFilteredNotes: () => {
    const { notes, searchQuery } = get();
    if (!searchQuery) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.some((t) => t.toLowerCase().includes(q)));
  },
}));
