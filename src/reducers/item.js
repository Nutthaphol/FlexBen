import { ITEM_FETCHING, ITEM_FAILED, ITEM_SUCCESS } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ITEM_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case ITEM_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case ITEM_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
}
