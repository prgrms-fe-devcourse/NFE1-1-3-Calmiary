import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App.tsx';
import GlobalStyle from './styles/globalStyle.tsx';
import theme from './styles/theme';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
