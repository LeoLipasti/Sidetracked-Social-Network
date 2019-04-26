import React from "react";
//const axios = require("axios");
import axios from "./axios";

import style from "./styling.js";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.handleInput.bind(this);
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
                email: this.state.email,
                passw: this.state.passw
            })
            .then(() => {
                location.replace("/");
            })
            .catch(() => {
                this.setState({ error: "error" });
                console.log("error");
            });
    }
    render() {
        const handleInput = e => {
            this.setState({ [e.target.name]: e.target.value });
        };
        return (
            <div className="box">
                {this.state.error && (
                    <div style={style.data.error}>Something went wrong!</div>
                )}
                <p>
                    First Name
                    <input name="first" onChange={handleInput} />
                </p>
                <p>
                    Last Name
                    <input name="last" onChange={handleInput} />
                </p>
                <p>
                    Email
                    <input name="email" onChange={handleInput} />
                </p>
                <p>
                    Password
                    <input
                        name="passw"
                        onChange={handleInput}
                        type="password"
                    />
                </p>
                <button onClick={e => this.submit()}>Join up</button>
            </div>
        );
    }
}
