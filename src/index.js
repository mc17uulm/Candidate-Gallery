import App from "./App";
import ReactDOM from "react-dom";
import React from "react";

const elem = document.getElementById("cg_app_add");
console.log(elem);
elem ? ReactDOM.render(<App />, elem) : false;