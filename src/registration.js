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
            });
    }
    render() {
        const handleInput = e => {
            this.setState({ [e.target.name]: e.target.value });
        };
        return (
            <div>
                {this.state.error && (
                    <div style={style.data.error} className="infotext">
                        Something went wrong!
                    </div>
                )}
                <div style={style.data.box}>
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
                </div>
                <button onClick={e => this.submit()} style={style.data.button}>
                    Join up
                </button>
            </div>
        );
    }
}
