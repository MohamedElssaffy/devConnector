import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_FAIL,
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');

    dispatch({ type: AUTH_SUCCESS, data: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAIL });
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const res = await axios.post('/users/register', data);

    dispatch({ type: REGISTER_SUCCESS, data: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await axios.post('/auth', data);

    dispatch({ type: LOGIN_SUCCESS, data: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
