import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

const App = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact>
        <Navbar />
      </Route>
      <Route path='/auth' exact>
        <Auth />
      </Route>
    </BrowserRouter>
  );
};

export default App;
