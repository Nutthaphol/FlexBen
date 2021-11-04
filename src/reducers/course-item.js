import { COURSEITEM_FETCHING, COURSEITEM_FAILED, COURSEITEM_SUCCESS } from "../actions/types";

const initialState = {
  result: null,
  isFetching: false,
  isError: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case COURSEITEM_FETCHING:
      return { ...state, result: null, isFetching: true, isError: false };
    case COURSEITEM_FAILED:
      return { ...state, result: null, isFetching: false, isError: true };
    case COURSEITEM_SUCCESS:
      return { ...state, result: payload, isFetching: false, isError: false };
    default:
      return state;
  }
};
