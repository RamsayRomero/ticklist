import { GET_ASCENTS_BY_USER, ASCENTS_ERROR, LOG_ASCENT } from './types';
import api from '../../utils/api';

export const getAscentsByUser = (user_id) => async (dispatch) => {
  try {
    const { data } = await api.get(`/ascents/user/${user_id}`);
    dispatch({ type: GET_ASCENTS_BY_USER, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: ASCENTS_ERROR, payload: error.response.data.errors });
    } else if (error.request) {
      dispatch({ type: ASCENTS_ERROR, payload: error.request });
    } else {
      dispatch({ type: ASCENTS_ERROR, payload: error.message });
    }
  }
};

export const logAscent = (ascentData, area_id) => async (dispatch) => {
  try {
    const { data } = await api.post(`/ascents/${area_id}`, ascentData);
    dispatch({ type: LOG_ASCENT, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: ASCENTS_ERROR, payload: error.response.data.errors });
    } else if (error.request) {
      dispatch({ type: ASCENTS_ERROR, payload: error.request });
    } else {
      dispatch({ type: ASCENTS_ERROR, payload: error.message });
    }
  }
};
