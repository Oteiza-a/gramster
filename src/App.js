import React from 'react';
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Components
import { Login } from './pages/login/Login' 
import { SheetsIndex } from './pages/sheets-index/SheetsIndex' 
import { Profile } from './pages/profile/Profile';
import { SheetForm } from './pages/sheet-form/SheetForm';
import { RedirectPage } from './pages/redirect/Redirect';

// Utils
import { colorPalette } from './fixed-data/colorPalette'

// CSS
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: colorPalette.primary,
    },
    secondary: {
      main: colorPalette.secondary,
    },
  },
  typography: {
    fontFamily: `"Rubik", "Roboto", "Helvetica", sans-serif`,
    fontSize: 14,
   }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/sheets/index' element={<SheetsIndex />} />
          <Route exact path='/sheets/form' element={<SheetForm />} />
          <Route path='/profile' >
            <Route path='' element={<Profile />} />
            <Route path=':userId' element={<Profile />}/>
          </Route>
          <Route exact path='*' element={<RedirectPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
