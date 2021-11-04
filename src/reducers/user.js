import { USERS_FETCHING, USERS_FAILED, USERS_SUCCESS } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERS_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case USERS_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case USERS_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
