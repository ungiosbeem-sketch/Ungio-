import { useContext, createContext } from 'react';
import { Colors } from '@/constants';
import type { ThemeMode } from '@/constants';

interface ThemeContextType {
  mode: ThemeMode;
  isDark: boolean;
  colors: typeof Colors.light;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  isDark: false,
  colors: Colors.light,
  setMode: () => {},
  toggleMode: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
