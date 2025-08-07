import { type ReactNode, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

export type Theme = 'light' | 'dark';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme-store')
    return saved === 'dark' ? 'dark' : 'light'
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme-store', theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return <ThemeContext.Provider
    value={{
      theme,
      toggle
    }}
  >{children}</ThemeContext.Provider>
}

