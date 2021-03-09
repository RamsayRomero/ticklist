import {
  AUTH_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  errors: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        errors: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case ACCOUNT_DELETED:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: null,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: null,
      };
    default:
      return state;
  }
}

export default authReducer;
