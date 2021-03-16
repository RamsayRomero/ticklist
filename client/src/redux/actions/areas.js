import api from '../../utils/api';
import { AREA_ERROR, ADD_AREA, GET_AREAS } from './types';

export const getAreas = () => async (dispatch) => {
  try {
    const { data } = await api('/areas');
    dispatch({ type: GET_AREAS, payload: data });
  } catch (error) {
    if (error.response) {
      dispatch({ type: AREA_ERROR, payload: error.response.data.errors });
    } else if (error.request) {
      dispatch({ type: AREA_ERROR, payload: error.request });
    } else {
      dispatch({ type: AREA_ERROR, payload: error.message });
    }
  }
};
