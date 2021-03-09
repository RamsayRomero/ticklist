import api from '../../utils/api';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_START,
  CLEAR_ERRORS,
} from './types';

export const loadUser = () => async (dispatch) => {
  dispatch({ type: AUTH_START });

  try {
    const res = await api.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      dispatch({ type: AUTH_ERROR, payload: error.response.data.errors });
      console.log(error.response.data);
    } else if (error.request) {
      dispatch({ type: AUTH_ERROR, payload: error.request });
      console.log(error.request);
    } else {
      dispatch({ type: AUTH_ERROR, payload: error.message });
      console.log('Error', error.message);
    }
  }
};

export const register = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_START });

  try {
    const res = await api.post('/users/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.errors });
      console.log(error.response.data.errors);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      dispatch({ type: REGISTER_FAIL, payload: error.request });
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch({ type: REGISTER_FAIL, payload: error.message });
      console.log('Error', error.message);
    }
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: AUTH_START });

  const body = { email, password };

  try {
    const res = await api.post('/auth/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.errors });
      console.log(error.response.data.errors);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      dispatch({ type: LOGIN_FAIL, payload: error.request });
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      dispatch({ type: LOGIN_FAIL, payload: error.message });
      console.log('Error', error.message);
    }
  }
};

export const logout = () => ({ type: LOGOUT });

export const clearErrors = () => ({ type: CLEAR_ERRORS });
