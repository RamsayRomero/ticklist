import api from '../../utils/api';
import { USERS_ERROR, GET_USERS } from './types';

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.get('/users');
    dispatch({ type: GET_USERS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: USERS_ERROR, payload: error.response.data.errors });
    } else if (error.request) {
      dispatch({ type: USERS_ERROR, payload: error.request });
    } else {
      dispatch({ type: USERS_ERROR, payload: error.message });
    }
  }
};
