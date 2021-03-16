import { ADD_AREA, AREA_ERROR, GET_AREAS } from '../actions/types';

const initialState = {
  areas: [],
  loading: true,
  errors: null,
};

function areaReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_AREA:
    case GET_AREAS:
      return { ...state, areas: payload, loading: false, errors: null };
    case AREA_ERROR:
      return { ...state, loading: false, errors: payload };
    default:
      return state;
  }
}

export default areaReducer;
