import React, { createContext, useReducer, useEffect } from "react";
import todoReducer from "../reducers/todoReducer";

export const TodoContext = createContext();

const initialState = {
  data: [],
  user_id: "",
  loading: false,
  todo_id: "",
  pop: false,
  popUp: false,
  setLoad: true,
  loaded: false
};

export default function TodoContextProvider(props) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const localData = localStorage.getItem("data");
    dispatch({
      type: "RELOAD",
      payload: localData ? JSON.parse(localData) : []
    });
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
}
