import {
  HEALTHCHECK_FETCHING,
  HEALTHCHECK_FAILED,
  HEALTHCHECK_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HEALTHCHECK_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HEALTHCHECK_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HEALTHCHECK_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
