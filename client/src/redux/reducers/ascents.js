import {
  GET_ASCENTS_BY_USER,
  ASCENTS_ERROR,
  LOG_ASCENT,
} from '../actions/types';

const initialState = {
  ascents: [],
  user: null,
  errors: null,
  loading: true,
};

function ascentsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ASCENTS_BY_USER:
      return { ...state, ...payload, loading: false, errors: null };
    case ASCENTS_ERROR:
      return { ...state, errors: payload, loading: false };
    case LOG_ASCENT:
      return { ...state, ascents: payload, loading: false, errors: null };
    default:
      return state;
  }
}

export default ascentsReducer;
