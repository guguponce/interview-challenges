import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <h1 id="title" className="nes-text is-primary">Are you a Pokemon master?</h1>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
