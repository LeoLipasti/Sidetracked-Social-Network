import React from "react";

import Registration from "./registration";
import Login from "./login";

import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import style from "./styling.js";

// placeholder test - also move styling to its own file later

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={style.data.userbox}>
                <h1>Welcome to Sidetracked the Social Network!</h1>
                <HashRouter>
                    <div>
                        <p>
                            <Link to="/register">New User Register</Link>
                            <Link to="/login">Login</Link>
                        </p>
                        <Route
                            exact
                            path="/register"
                            component={Registration}
                        />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
