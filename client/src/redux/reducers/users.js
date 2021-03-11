import { GET_USERS, USERS_ERROR } from '../actions/types';

const initialState = {
  users: [],
  errors: null,
  loading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return { ...state, ...payload, errors: null, loading: false };
    case USERS_ERROR:
      return { ...state, errors: payload, loading: false };
    default:
      return state;
  }
};
