// import { v4 as uuidv4 } from "uuid";

export const resultReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RESULT":
      return { ...state, results: action.payload };
    default:
      return state;
  }
};
