import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TodoContext } from "../context/TodoContext";
import Register from "./Register";
import force from "../force.png";
import art1 from "../art1.png";
import Loader from "./Loader"
import {motion} from 'framer-motion'

export default function Signin(props) {
  const { state, dispatch } = useContext(TodoContext);
  const [register, setRegister] = useState(false);
  const [log_email, setLog_email] = useState("");
  const [log_password, setLog_password] = useState("");
  const [corr, setCorr] = useState(false);

  const chngLogEmail = (e) => {
    setLog_email(e.target.value);
  };

  const chngLogPassword = (e) => {
    setLog_password(e.target.value);
  };
  const log = (e) => {
    e.preventDefault();
    dispatch({ type: "LOADING", payload: true });
    axios({
      method: "post",
      url: "https://sleepy-cliffs-82593.herokuapp.com/signin",
      data: {
        email: log_email,
        password: log_password,
      },
    })
      .then((res) => {
        if (res.status === 400) {
          e.preventDefault();
        } else {
          dispatch({ type: "UPDATE_USER", payload: res.data });
          dispatch({ type: "DONE_LOADING", payload: false });
          localStorage.setItem("data", JSON.stringify(res.data));
          props.history.push("./todo");
        }
      })
      .catch((err) => {
        dispatch({ type: "DONE_LOADING", payload: false });
        setCorr(true);
        setTimeout(() => {
          setCorr(false)
        }, 2000);
      });
  };

    const buttonVariant = {
      visible: {
        scale: 1.1,
      }
  }

  const artVariant = {
    hidden: {
      y: "-100vh"
    },
    visible: {
      y: 0,
      transition: {type: "spring", stiffness: 120}
    }
  }

  const view = state.loading ? (
    <div className="loading">
      <Loader />
    </div>
  ) : (
    <div>
      <div className="header">
        <div className="force">
          <img src={force} alt="logo" />
        </div>
        <div className="logout">
          <motion.button 
          variants={buttonVariant} 
          whileHover="visible"
          type="submit"
          onClick={() => setRegister(!register)}>
            {register ? "Login" : "Register"}
          </motion.button>
        </div>
      </div>
      {!register ? (
        <div>
          <form className="login" onSubmit={log}>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={log_email}
              onChange={chngLogEmail}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={log_password}
              onChange={chngLogPassword}
            />
            <button type="submit">Login</button>
            <p
              className="signinErr"
              style={corr ? { dispaly: "block" } : { display: "none" }}
            >
              wrong email or password
            </p>
          </form>
          <motion.div
          variants ={artVariant}
          initial="hidden"
          animate="visible" 
          className="todo">
            <img src={art1} alt="art1" />
          </motion.div>
        </div>
      ) : (
        <div>
          <Register props={props} />
        </div>
      )}
    </div>
  );

  return view;
}
