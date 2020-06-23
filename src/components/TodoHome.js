import React, { useEffect, useContext, useState } from "react";
import Add from "./Add";
import Todo from "./Todo";
import Header from "./Header";
import axios from "axios";
import { TodoContext } from "../context/TodoContext";
import Modal from "./Modal";
import Loadtask from "./Loadtask";

export default function TodoHome(props) {
  const { state, dispatch } = useContext(TodoContext);
  const [loading, setLoading] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios(
      `https://sleepy-cliffs-82593.herokuapp.com/todo/${state.user_id}`
    ).then((res) => {
      dispatch({ type: "UPDATE_USER", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
    });
  }, [state.user_id]);




  const view = (
    <div>
      <Loadtask loading={loading} loaded={loaded} />
      <Modal props={props} />
      <Header props={props}  />
      <div className="todo-table">
        <Add props={props} setLoading={setLoading} setLoaded={setLoaded} />
        <Todo />
      </div>
    </div>
  );

  return view;
}
