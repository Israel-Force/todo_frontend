import React, { useEffect, useContext } from "react";
import Add from "./Add";
import Todo from "./Todo";
import Header from "./Header";
import axios from "axios";
import { TodoContext } from "../context/TodoContext";

export default function TodoHome(props) {
  const { state, dispatch } = useContext(TodoContext);

  useEffect(() => {
    axios(`http://localhost:3001/todo/${state.user_id}`).then((res) => {
      dispatch({ type: "UPDATE_USER", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
    });
  }, [state.user_id]);

  return (
    <div>
      <Header props={props} />
      <div className="todo-table">
        <Add props={props} />
        <Todo />
      </div>
    </div>
  );
}
