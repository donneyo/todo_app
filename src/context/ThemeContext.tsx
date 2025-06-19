'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    // Optional: Persist theme across refresh using localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`${theme === 'dark' ? 'bg-[#1F1F22] text-white' : 'bg-[#F5F5F7] text-black'} min-h-screen transition-colors duration-300`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
