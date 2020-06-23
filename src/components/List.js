import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";
import moment from "moment-timezone";
import trash_bin from "../trash_bin.png";

export default function List(
  { todo_id, item, schedule_date, schedule_time },
  props
) {
  const { state, dispatch } = useContext(TodoContext);

  const dragStart = (e) => {
    dispatch({ type: "ITEM", payload: todo_id });
    setTimeout(() => {
      e.target.className = "invisible";
    }, 0);
    e.persist();
  };

  const drop = (e) => {
    e.target.className = "item";
    console.log(schedule_date)
  };

  const remove = (e) => {
    e.preventDefault();
    dispatch({ type: "CHNG_LOADED", payload: true });
    axios({
      method: "delete",
      url: `https://sleepy-cliffs-82593.herokuapp.com/todo/${todo_id}/${state.user_id}`,
    }).then((res) => {
      dispatch({ type: "DELETE", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
      dispatch({ type: "CHNG_LOADED", payload: false });
    });
  };

  const database = moment(`${schedule_date}`, "YYYY-MM-DD HH:mm Z");
  const nig = database.clone().tz("Africa/Lagos");
  const nigTime = nig.format();

  const date = schedule_date ? nigTime.slice(0, 10) : false;

  const view = (
    <li
      className="item"
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={drop}
    >
      <div className="task"> {item}</div>
      <div className="date">{date}</div>
      <p>{schedule_time}</p>
      <div
      className="trash_list"
      onClick={remove}
    >
      <img src={trash_bin} alt="logo" />
    </div>
    </li>
  );

  return view;
}
