import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";
import Registration from "./registration";
import Login from "./login";

let elem;

if (location.pathname == "/welcome") {
    console.log("Welcome");
    elem = <Welcome />;
} else if (location.pathname == "/register") {
    elem = <Registration />;
} else if (location.pathname == "/login") {
    elem = <Login />;
} else {
    elem = <img src="/logo.gif" />;
}
console.log(location.pathname);

ReactDOM.render(elem, document.querySelector("main"));
