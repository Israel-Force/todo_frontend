import React from "react";
import { Route } from "react-router-dom";
import Signin from "./components/Signin";
import TodoHome from "./components/TodoHome";

const App = () => {
  return (
    <div className="app">
      <Route exact path="/" component={Signin} />
      <Route path="/todo" component={TodoHome} />
    </div>
  );
};

export default App;
