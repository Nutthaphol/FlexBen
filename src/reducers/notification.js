import {
  NOTIFICATION_FETCHING,
  NOTIFICATION_FAILED,
  NOTIFICATION_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case NOTIFICATION_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case NOTIFICATION_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case NOTIFICATION_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
