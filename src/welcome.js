import React from "react";

import Registration from "./registration";
import Login from "./login";

import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

// placeholder test - also move styling to its own file later
const TodoComponent = {
    width: "300px",
    margin: "30px auto",
    backgroundColor: "#44014C",
    minHeight: "200px",
    boxSizing: "border-box",
    color: "white"
};

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={TodoComponent}>
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
