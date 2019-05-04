import React from "react";
import axios from "./axios";

import style from "./styling.js";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
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
                <p className="infotext">login with your email and password</p>
                {this.state.error && (
                    <div style={style.data.error} className="infotext">
                        Something went wrong!
                    </div>
                )}
                <div style={style.data.box}>
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
                <button
                    onClick={() => this.submit()}
                    style={style.data.buttonbordered}
                >
                    Login
                </button>
            </div>
        );
    }
}
