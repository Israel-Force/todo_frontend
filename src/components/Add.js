import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";

export default function Add(props) {
  const { state, dispatch } = useContext(TodoContext);

  const [item, setItem] = useState("");

  const change = (e) => {
    setItem(e.target.value);
  };
  const post = (e) => {
    e.preventDefault();
    axios(`http://localhost:3001/todo/${state.user_id}`, {
      method: "post",
      data: {
        user_id: state.user_id,
        item,
      },
    }).then((res) => {
      dispatch({ type: "UPDATE_ITEM", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
    });
    props.props.history.push("./todo");
    setItem("");
  };

  return (
    <form onSubmit={post}>
      <input
        onChange={change}
        type="text"
        placeholder="Add new item..."
        name="item"
        value={item}
        required
      />
      <button type="submit">Add item</button>
    </form>
  );
}
