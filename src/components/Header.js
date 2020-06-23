import React, { useContext, useState } from "react";
import force from "../force.png";
import trash_bin from "../trash_bin.png";
import axios from "axios";
import { TodoContext } from "../context/TodoContext";
import search_pic from "../search_pic.png";

export default function Header(props) {
  const { state, dispatch } = useContext(TodoContext);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");

  const logOut = () => {
    localStorage.clear();
    props.props.history.push("./");
  };

  // const show = () => {
  //   setDisplay(!display)
  // }

  const rmv = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `https://sleepy-cliffs-82593.herokuapp.com/todo/${state.todo_id}/${state.user_id}`,
    }).then((res) => {
      dispatch({ type: "DELETE", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
    });
  };

  const over = (e) => {
    e.preventDefault();
  };

  const change = (e) => {
    setSearch(e.target.value);
  };

  const displayBin = () => {
    setDisplay(true)
    setTimeout(() => {
      setDisplay(false)
    }, 5000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(`https://sleepy-cliffs-82593.herokuapp.com/todo/${state.user_id}/${search}`, {
      method: "post",
      data: {
        search,
      },
    }).then((res) => {
      dispatch({ type: "UPDATE_ITEM", payload: res.data });
      props.props.history.push("/todo");
    });
    setSearch("");
  };

  return (
    <div className="header">
      <div className="force">
        <img src={force} alt="logo" />
      </div>
      <form className="header_form" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="search here for todo"
          name="search"
          value={search}
          onChange={change}
        />
        <button>
          <div className="search_img">
            <img src={search_pic} alt="todo" />
          </div>
        </button>
      </form>
      <div
        className="trash"
        onDrop={rmv}
        onDragEnter={over}
        onDragOver={over}
        onMouseOver={() => setDisplay(true)}
        onMouseLeave={() => setDisplay(false)}
        onClick={displayBin}
      >
        <img src={trash_bin} alt="logo" />
      </div>
      <p className={display ? "trash_drag" : "invisible"}>
        drag here to delete
      </p>
      <div className="logout">
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
}
