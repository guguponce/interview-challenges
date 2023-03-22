import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CarritoProvider } from "./context/CarritoContext";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
