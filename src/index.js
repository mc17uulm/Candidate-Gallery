import App from "./App";
import ReactDOM from "react-dom";
import React from "react";

const elem = document.getElementById("cg_application");
elem ? ReactDOM.render(<App />, elem) : false;