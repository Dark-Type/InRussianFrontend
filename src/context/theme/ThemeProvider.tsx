import React, {useEffect, useState} from 'react';
import {ThemeContext} from './ThemeContext';

type Theme = 'light' | 'dark';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

    return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>;
};

