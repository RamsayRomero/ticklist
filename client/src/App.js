import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import { LOGOUT } from './redux/actions/types';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

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
