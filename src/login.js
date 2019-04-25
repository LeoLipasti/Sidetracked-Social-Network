import React from "react";
import axios from "./axios";

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
                <p>Login with your email and password</p>
                {this.state.error && (
                    <div className="error">Something went wrong!</div>
                )}
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
                <button onClick={e => this.submit()}>Login</button>
            </div>
        );
    }
}
