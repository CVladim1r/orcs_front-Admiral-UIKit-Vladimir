import './index.css';
import '@/shared/i18n';

import { DARK_THEME, DropdownProvider, FontsVTBGroup, LIGHT_THEME } from '@vtb/ui-kit3';
import  { useEffect, useState } from 'react';

import Provider from './providers';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

function getPreferredTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else {
    return 'light';
  }
}

function App() {
  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? DARK_THEME : LIGHT_THEME}>
      <DropdownProvider>
        <FontsVTBGroup />
        <Provider />
      </DropdownProvider>
    </ThemeProvider>
  );
}


export default App;

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
