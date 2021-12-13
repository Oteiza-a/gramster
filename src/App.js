import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Login } from './pages/login/Login' 
import { Home } from './pages/home/Home' 
import { Profile } from './pages/profile/Profile';
import { RedirectPage } from './Redirect';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E54B4B',
    },
    secondary: {
      main: '#FF9585',
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
          <Route exact path='/home' element={<Home />} />
          <Route path='/profile'  >
            <Route path='' element={<Profile />}/>
            <Route path=':userId' element={<Profile />}/>
          </Route>
          <Route exact path='*' element={<RedirectPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
