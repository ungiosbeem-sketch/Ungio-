export type ThemeMode = 'light' | 'dark' | 'system';

export const Colors = {
  light: {
    primary: '#0F172A',
    secondary: '#1E293B',
    accent: '#3B82F6',
    accentLight: '#EFF6FF',
    accentDark: '#1D4ED8',
    success: '#10B981',
    successLight: '#ECFDF5',
    warning: '#F59E0B',
    warningLight: '#FFFBEB',
    error: '#EF4444',
    errorLight: '#FEF2F2',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceSecondary: '#F1F5F9',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    textTertiary: '#94A3B8',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',
    shadow: 'rgba(0,0,0,0.04)',
    shadowDark: 'rgba(0,0,0,0.08)',
    cardBg: '#FFFFFF',
    overlay: 'rgba(0,0,0,0.5)',
  },
  dark: {
    primary: '#F1F5F9',
    secondary: '#CBD5E1',
    accent: '#60A5FA',
    accentLight: '#172554',
    accentDark: '#93C5FD',
    success: '#34D399',
    successLight: '#064E3B',
    warning: '#FBBF24',
    warningLight: '#78350F',
    error: '#F87171',
    errorLight: '#7F1D1D',
    background: '#0B1120',
    surface: '#162032',
    surfaceSecondary: '#1E293B',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    border: '#1E293B',
    borderLight: '#162032',
    shadow: 'rgba(0,0,0,0.3)',
    shadowDark: 'rgba(0,0,0,0.5)',
    cardBg: '#162032',
    overlay: 'rgba(0,0,0,0.7)',
  },
};

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const Radius = { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 };
export const Font = { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 24, xxxl: 32, hero: 40 };

export const TASK_CATEGORIES: { label: string; value: string; color: string }[] = [
  { label: 'Study', value: 'study', color: '#3B82F6' },
  { label: 'Work', value: 'work', color: '#8B5CF6' },
  { label: 'Health', value: 'health', color: '#10B981' },
  { label: 'Personal', value: 'personal', color: '#F59E0B' },
  { label: 'Finance', value: 'finance', color: '#EF4444' },
  { label: 'Other', value: 'other', color: '#6B7280' },
];

export const PRIORITIES: { label: string; value: string; color: string }[] = [
  { label: 'Low', value: 'low', color: '#10B981' },
  { label: 'Medium', value: 'medium', color: '#F59E0B' },
  { label: 'High', value: 'high', color: '#EF4444' },
  { label: 'Urgent', value: 'urgent', color: '#DC2626' },
];

export const HABIT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#06B6D4', '#F97316', '#14B8A6', '#6366F1',
];

export const HABIT_ICONS = [
  'droplets', 'dumbbell', 'book-open', 'brain', 'moon', 'sun',
  'apple', 'heart', 'footprints', 'music', 'pen-tool', 'smile',
];

export const FOCUS_DURATIONS = {
  pomodoro: 25,
  short_break: 5,
  long_break: 15,
  deep_work: 60,
};

export const QUOTES = [
  { text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
  { text: "It always seems impossible until it's done.", author: 'Nelson Mandela' },
  { text: "Don't watch the clock; do what it does. Keep going.", author: 'Sam Levenson' },
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { text: 'Success is not final, failure is not fatal.', author: 'Winston Churchill' },
  { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
  { text: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
  { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
  { text: 'Small daily improvements lead to staggering long-term results.', author: 'Unknown' },
  { text: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
];

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const NOTE_COLORS = ['#FFFFFF', '#FEF3C7', '#DBEAFE', '#D1FAE5', '#FEE2E2', '#F3E8FF', '#E0F2FE'];
