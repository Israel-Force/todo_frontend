import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";


export default function List({ todo_id, item }, props) {
  const { state, dispatch } = useContext(TodoContext);
  //const [dragged, setDragged] = useState(false)

  const dragStart = (e) => {
    dispatch({ type: "ITEM", payload: todo_id });
    setTimeout(() => {
      e.target.className = "invisible";
    }, 0);
    e.persist();
  };

  const drop = (e) => {
    e.target.className = "item";
  };

  const remove = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `https://sleepy-cliffs-82593.herokuapp.com/todo/${todo_id}/${state.user_id}`,
    }).then((res) => {
      dispatch({ type: "DELETE", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
    });
  };
  const view = (
    <li
      className="item"
      draggable="true"
      onClick={remove}
      onDragStart={dragStart}
      onDragEnd={drop}
    >
      {item}
    </li>
  );

  return view;
}
