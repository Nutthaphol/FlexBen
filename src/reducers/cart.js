const initialState = {
  value: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("action ", payload);
  switch (type) {
    case "ADD":
      const tmp = [...state.value];
      tmp.push(payload);

      return { ...state, value: tmp };
    case "REMOVE":
      return { ...state, value: payload };
    default:
      return state;
  }
}
