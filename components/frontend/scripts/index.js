import Frontend from "./Frontend";
import ReactDOM from "react-dom";
import React from "react";

const elem = document.getElementById("cg_gallery_frontend");
const id = elem.getAttribute('defaultvalue');
elem ? ReactDOM.render(<Frontend id={id} />, elem) : false;