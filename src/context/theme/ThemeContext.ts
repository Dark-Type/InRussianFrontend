import { createContext } from 'react'
import type { Theme } from './ThemeProvider'

export const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void
}>({
  theme: 'light', toggle: () => {
  }
})