import {
  HEALTH_FETCHING,
  HEALTH_FAILED,
  HEALTH_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case HEALTH_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case HEALTH_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case HEALTH_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
