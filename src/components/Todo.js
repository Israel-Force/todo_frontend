import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import List from "./List";

export default function Todo() {
  const { state } = useContext(TodoContext);
  return (
    <ul>
      {state.data.map((todo) =>
        todo.item === null ? false : <List key={todo.todo_id} {...todo} />
      )}
    </ul>
  );
}
