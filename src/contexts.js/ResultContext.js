import React, { createContext, useReducer } from "react";
// import AppReducer from "./AppReducer";
import { resultReducer } from "../reducers/ResultReducer";

//initial state
// const initialState = {
//   results: [
//     { id: 1, user: "Flower", count: 20 },
//     { id: 2, user: "Salary", count: 300 },
//     { id: 3, user: "Book", count: 10 },
//     { id: 4, user: "Camera", count: 150 },
//   ],
// };

//create context
export const ResultContext = createContext();

//provider
export const ResultContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resultReducer, []);

  const updateResult = (result) => {
    dispatch({
      type: "UPDATE_RESULT",
      payload: result,
    });
  };

  return (
    <ResultContext.Provider
      value={{
        results: state.results,
        updateResult,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};
