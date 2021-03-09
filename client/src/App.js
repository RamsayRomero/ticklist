import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Users from './pages/Users';
import AllAreas from './pages/AllAreas';
import MyAreas from './pages/MyAreas';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

import store from './redux/store';
import { connect } from 'react-redux';
import { loadUser } from './redux/actions/auth';
import { LOGOUT } from './redux/actions/types';
import setAuthToken from './utils/setAuthToken';

const App = ({ user }) => {
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

  let routes;

  if (user) {
    routes = (
      <Switch>
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/users' exact component={Users} />
        <Route path='/areas' exact component={AllAreas} />
        <Route path='/myareas' exact component={MyAreas} />
        <Route path='/profile' exact component={Profile} />
        <Route path='/settings' exact component={Settings} />
        <Redirect to='/dashboard' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/auth' exact component={Auth} />
        <Route path='/users' exact component={Users} />
        <Route path='/areas' exact component={AllAreas} />
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
