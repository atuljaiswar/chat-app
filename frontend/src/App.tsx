import { ThemeProvider } from '@mui/material/styles';
import theme from './materialTheme';
import './App.scss';
import './svg.d.ts';
import Routers from './routers/route';
import React from 'react';
import { PortalProvider } from './context/PortalContext';
import AuthContext from './context/authContext.tsx';
import SocketContextProvider from './context/socketContext.tsx';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContext>
        <SocketContextProvider>
          <PortalProvider>
            <Routers />
          </PortalProvider>
        </SocketContextProvider>
      </AuthContext>
    </ThemeProvider>
  );
};

export default App;
