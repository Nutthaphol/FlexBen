import { BILL_FETCHING, BILL_FAILED, BILL_SUCCESS } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case BILL_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case BILL_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case BILL_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
