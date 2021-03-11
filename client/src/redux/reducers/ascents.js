import { GET_ASCENTS_BY_USER, ASCENTS_ERROR } from '../actions/types';

const initialState = {
  ascents: [],
  user: null,
  errors: null,
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ASCENTS_BY_USER:
      return { ...state, ...payload, loading: false, errors: null };
    case ASCENTS_ERROR:
      return { ...state, errors: payload };
    default:
      return state;
  }
};
