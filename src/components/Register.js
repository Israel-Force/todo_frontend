import React, { useState, useContext } from "react";
import axios from "axios";
import { TodoContext } from "../context/TodoContext";
import register_pics from "../register_pics.png";
import Loader from "./Loader"
import {motion} from 'framer-motion'


export default function Register(props) {
  const { state, dispatch } = useContext(TodoContext);

  const [reg_first, setReg_first] = useState("");
  const [reg_last, setReg_last] = useState("");
  const [reg_email, setReg_email] = useState("");
  const [reg_password, setReg_password] = useState("");
  const [corrFirst, setCorrFirst] = useState(false);
  const [corrLast, setCorrLast] = useState(false);
  const [corrEmail, setCorrEmail] = useState(false);
  const [corrPassword, setCorrPassword] = useState(false);
  const [Regcorr, setRegcorr] = useState(false);

  const RegEx = {
    first_name: /^[a-z]{2,50}$/i,
    last_name: /^[a-z]{2,50}$/i,
    password: /^[\w]{6,20}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  };

  const chngFirst = (e) => {
    setReg_first(e.target.value);
  };
  const chngLast = (e) => {
    setReg_last(e.target.value);
  };
  const chngEmail = (e) => {
    setReg_email(e.target.value);
  };
  const chngPassword = (e) => {
    setReg_password(e.target.value);
  };

  const testFirst_name = () => {
    RegEx.first_name.test(reg_first) ? setCorrFirst(false) : setCorrFirst(true);
  };

  const testLast_name = () => {
    RegEx.last_name.test(reg_last) ? setCorrLast(false) : setCorrLast(true);
  };

  const testEmail = () => {
    RegEx.email.test(reg_email) ? setCorrEmail(false) : setCorrEmail(true);
  };

  const testPassword = () => {
    RegEx.password.test(reg_password)
      ? setCorrPassword(false)
      : setCorrPassword(true);
  };

  const pass = (e) => {
    dispatch({ type: "LOADING", payload: true });
    axios({
      method: "post",
      url: "https://sleepy-cliffs-82593.herokuapp.com/register",
      data: {
        first_name: reg_first,
        last_name: reg_last,
        email: reg_email,
        password: reg_password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "UPDATE_REG", payload: res.data });
          dispatch({ type: "DONE_LOADING", payload: false });
          localStorage.setItem("data", JSON.stringify(res.data));
          props.props.history.push("./todo");
        } else {
          e.preventDefault();
        }
      })
      .catch((err) => {
        dispatch({ type: "DONE_LOADING", payload: false });
        setRegcorr(true);
        setTimeout(() => {
          window.location = "/";
        }, 3000);
      });
  };
    const regVariant = {
    hidden: {
      y: "-100vh"
    },
    visible: {
      y: 0,
      transition: {type: "spring", stiffness: 120}
    }
  }

  const reg = (e) => {
    e.preventDefault();
    RegEx.first_name.test(reg_first) &&
    RegEx.last_name.test(reg_last) &&
    RegEx.email.test(reg_email) &&
    RegEx.password.test(reg_password)
      ? pass()
      : e.preventDefault();
  };

  const view = state.loading ? (
    <div className="loading">
      <Loader />
    </div>
  ) : (
    <div>
      <form className="register" onSubmit={reg}>
        <div className="block">
          <p
            className="signinErr"
            style={Regcorr ? { dispaly: "block" } : { display: "none" }}
          >
            user already exist
          </p>
        </div>
        <div className="block">
          <input
            type="text"
            placeholder="firstname"
            name="first_name"
            value={reg_first}
            onChange={chngFirst}
            onKeyUp={testFirst_name}
          />
          <label className={corrFirst ? "valid" : "wrong"} htmlFor="first_name">
            {" "}
            first_name can only be alphabets and must be 2-50 characters long
          </label>
        </div>
        <div className="block">
          <input
            type="text"
            placeholder="lastname"
            name="last_name"
            value={reg_last}
            onChange={chngLast}
            onKeyUp={testLast_name}
          />
          <label htmlFor="last_name" className={corrLast ? "valid" : "wrong"}>
            last_name can only be alphabets and must be 2-50 characters long
          </label>
        </div>
        <div className="block">
          <input
            type="email"
            placeholder="email"
            name="email"
            value={reg_email}
            onChange={chngEmail}
            onKeyUp={testEmail}
          />
          <label htmlFor="email" className={corrEmail ? "valid" : "wrong"}>
            email must be a valid address e.g me@mydomain.com
          </label>
        </div>
        <div className="block">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={reg_password}
            onChange={chngPassword}
            onKeyUp={testPassword}
          />
          <label
            htmlFor="password"
            className={corrPassword ? "valid" : "wrong"}
          >
            password must be 6 characters long, underscores may be used.
          </label>
        </div>
        <div className="block">
          <button>Register</button>
        </div>
      </form>
      <motion.div 
      ariants ={regVariant}
      initial="hidden"
      animate="visible" 
      className="register_pic">
        <img src={register_pics} alt="art1" />
      </motion.div>
    </div>
  );

  return view;
}
