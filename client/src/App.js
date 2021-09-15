import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './utils/axiosConfig';
import './App.css';
import store from './store';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route path='/' exact component={Landing} />
            <section className='container'>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/profiles' component={Profiles} />
              <Route path='/profile/:id' component={Profile} />
              <PrivateRoute component={Dashboard} path='/dashboard' />
              <PrivateRoute component={Posts} path='/posts' />
              <PrivateRoute component={Post} path='/post/:id' />
              <PrivateRoute component={CreateProfile} path='/create-profile' />
              <PrivateRoute component={EditProfile} path='/edit-profile' />
              <PrivateRoute component={AddExperience} path='/add-experience' />
              <PrivateRoute component={AddEducation} path='/add-education' />
            </section>
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
