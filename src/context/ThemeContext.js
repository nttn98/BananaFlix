import React, { createContext, useState, useContext, useEffect } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const lightTheme = {
  mode: 'light',
  colors: {
    primary: '#E50914',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    card: '#FFFFFF',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#ff4444',
    success: '#00C851',
    overlay: 'rgba(0, 0, 0, 0.5)',
    gradient1: '#FFFFFF',
    gradient2: '#F5F5F5',
    inputBg: '#F5F5F5',
    iconBg: 'rgba(0, 0, 0, 0.05)',
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: '#E50914',
    background: '#000000',
    surface: '#1a1a1a',
    card: '#1a1a1a',
    text: '#FFFFFF',
    textSecondary: '#888888',
    border: '#333333',
    error: '#ff4444',
    success: '#00C851',
    overlay: 'rgba(0, 0, 0, 0.7)',
    gradient1: '#000000',
    gradient2: '#1a0000',
    inputBg: '#1a1a1a',
    iconBg: 'rgba(255, 255, 255, 0.05)',
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    // Optional: Listen to system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Uncomment to auto-switch based on system
      // setIsDarkMode(colorScheme === 'dark');
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

