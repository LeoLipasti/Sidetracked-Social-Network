import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";
import Registration from "./registration";
import Login from "./login";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <img src="/logo.gif" />;
}

if (location.pathname == "/register") {
    elem = <Registration />;
} else {
    elem = <img src="/logo.gif" />;
}

if (location.pathname == "/login") {
    elem = <Login />;
} else {
    elem = <img src="/logo.gif" />;
}

ReactDOM.render(elem, document.querySelector("main"));
