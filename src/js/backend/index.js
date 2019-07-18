import Backend from "./Backend";
import ReactDOM from "react-dom";
import React from "react";

const elem = document.getElementById("cg_application");
elem ? ReactDOM.render(<Backend />, elem) : false;