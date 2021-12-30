const initialState = {
  path: null,
};

export default function (state = initialState, action) {
  const { type, path } = action;
  switch (type) {
    case "CLICK":
      return { ...state, path: path };
    default:
      return state;
  }
}
