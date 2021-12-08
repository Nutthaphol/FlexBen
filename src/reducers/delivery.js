import {
  DELIVERY_FETCHING,
  DELIVERY_FAILED,
  DELIVERY_SUCCESS,
} from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DELIVERY_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case DELIVERY_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case DELIVERY_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
