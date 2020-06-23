import React, { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import axios from "axios";

export default function Add({props}) {
  const { state, dispatch } = useContext(TodoContext);
  const [day, setDay] = useState("");
  const [item, setItem] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState("am");
  const [month, setMonth] = useState("June");
  const [year, setYear] = useState("");

  const change = (e) => {
    setItem(e.target.value);
  };
  const post = (e) => {
    dispatch({ type: "CHNG_LOADED", payload: true });
    e.preventDefault();
    axios(`https://sleepy-cliffs-82593.herokuapp.com/todo/${state.user_id}`, {
      method: "post",
      data: {
        user_id: state.user_id,
        item,
        day,
        month,
        year,
        hour,
        minute,
        period,
      },
    }).then((res) => {
      dispatch({ type: "UPDATE_ITEM", payload: res.data });
      localStorage.setItem("data", JSON.stringify(res.data));
      dispatch({ type: "CHNG_LOADED", payload: false });
      setItem("");
      setMinute('');
      setHour('');
      setDay('');
      dispatch({ type: "CHNG_POPUP", payload: true })
      setTimeout(() => {
        dispatch({ type: "CHNG_POPUP", payload: false });
        dispatch({ type: "CHNG_POP", payload: false });
        // window.location = "/todo";
      }, 8000);
      props.history.push("./todo");
    });

  };

  const handleChange = (e) => {
    let { value, max } = e.target;
    value = Math.min(Number(max), Number(value));
    setDay(value);
  };

  const changeHour = (e) => {
    let { value, max } = e.target;
    value = Math.min(Number(max), Number(value));
    setHour(value);
  };

  const changeMinute = (e) => {
    let { value, max } = e.target;
    value = Math.min(Number(max), Number(value));
    setMinute(value);
  };

  const changeMonth = (e) => {
    setMonth(e.target.value);
  };

  const changePeriod = (e) => {
    setPeriod(e.target.value);
  };

  const changeYear = (e) => {
    setYear(e.target.value);
    dispatch({ type: "CHNG_POP", payload: true });
    dispatch({ type: "CHNG_SETLOAD", payload: false });
  };

  // option value="January">January</option>
  // <option value="Febuary">Febuary</option>
  // <option value="March">March</option>
  // <option value="April">April</option>
  // <option value="May">May</option>

  return (
    <div className="add_container">
      <form onSubmit={post}>
        <input
          onChange={change}
          type="text"
          placeholder="Add new task..."
          name="item"
          value={item}
          required
        />
        <p>Add Calender</p>
        <div className="date">
          <input
            type="number"
            name="day"
            placeholder="1 - 31"
            value={day}
            max="31"
            min="1"
            onChange={handleChange}
          />
          <select onChange={changeMonth} value={month} name="month">
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="Octomberr">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <input
            type="number"
            name="year"
            value={year}
            placeholder="Year"
            onChange={changeYear}
          />
        </div>
        <div className="date">
          <label className="right">:</label>
          <label className="left">:</label>
          <input
            type="number"
            name="hour"
            value={hour}
            onChange={changeHour}
            placeholder="1 - 12"
            max="12"
            min="1"
          />
          <input
            type="number"
            name="minute"
            placeholder="minute"
            value={minute}
            onChange={changeMinute}
            max="60"
            min="0"
          />
          <select value={period} onChange={changePeriod} name="period">
            <option value="am">am</option>
            <option value="pm">pm</option>
          </select>
        </div>
        <button type="submit">Add task</button>
      </form>
    </div>
  );
}
