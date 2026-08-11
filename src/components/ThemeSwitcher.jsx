import { useEffect } from 'react';

const ThemeSwitcher = () => {
  useEffect(() => {
    // Clear any active theme to force the original default theme
    document.documentElement.removeAttribute('data-theme');
  }, []);

  return null; // No UI needed, themes disabled
};

export default ThemeSwitcher;
