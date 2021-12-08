import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from './pages/home/Home' 
import { Profile } from './pages/profile/Profile';
import { RedirectPage } from './Redirect';


function App() {
  return (
  <Router>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/profile'  >
        <Route path='' element={<Profile />}/>
        <Route path=':userId' element={<Profile />}/>
      </Route>
      <Route exact path='*' element={<RedirectPage />} />
    </Routes>
  </Router>
  );
}

export default App;
