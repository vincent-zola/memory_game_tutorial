// index.js exists because we render through it to our index.html

import React from "react";
import ReactDOM from "react-dom";
// import the component we want to render
import App from "./App";
import './index.css'


// what we render in our index.html
ReactDOM.render(<App />, document.querySelector("#root"));