import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const getDefaultTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'true';
    };

    const [theme, setTheme] = useState(getDefaultTheme);
    useEffect(() => {
        localStorage.setItem('theme', theme);

        if (theme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ setTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};