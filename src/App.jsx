import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TablesPage from './pages/TablesPage';
import ChartsPage from './pages/ChartsPage';
import CalendarPage from './pages/CalenderPage';
import KanbanPage from './pages/KanbanPage';
import ThemeSwitcher from './components/ThemeSwitcher';
import FormComponent from './components/FormComponent';

export const ThemeContext = React.createContext();

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Router>
          <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1, padding: '1rem' }}>
              <ThemeSwitcher />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tables" element={<TablesPage />} />
                <Route path="/charts" element={<ChartsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/kanban" element={<KanbanPage />} />
                <Route path='/Form' element={<FormComponent/>}/>
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
