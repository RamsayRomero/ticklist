import {
  GET_ASCENTS_BY_USER,
  ASCENTS_ERROR,
  LOG_ASCENT,
  LOG_ASCENT_START,
} from '../actions/types';

const initialState = {
  ascents: [],
  user: null,
  errors: null,
  loading: true,
};

function ascentsReducer(state = initialState, { type, payload }) {
  switch (type) {
    // case GET_ASCENTS_BY_USER:
    //   return {
    //     ...state,
    //     ...payload,
    //     loading: false,
    //     errors: null,
    //   };
    case ASCENTS_ERROR:
      return { ...state, errors: payload, loading: false };
    case LOG_ASCENT:
      return { ...state, loading: false, errors: null };
    case LOG_ASCENT_START:
      return { ...state, loading: true, errors: null };
    default:
      return state;
  }
}

export default ascentsReducer;
