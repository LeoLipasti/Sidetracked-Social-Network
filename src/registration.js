import React from "react";
const axios = require("axios");

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios.post("/register", {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            passw: this.state.passw
        });
        //.then(({ data }) => {
        // this.setState({
        //  error: true
        //})
        //    location.replace("/");
        //})
        //.catch
        //
        //();
    }
    render() {
        //const handleInput = e => {
        //    this.setState([e.target.name]: e.target.value);
        //};
        return (
            <div>
                {this.state.error && (
                    <div className="error">Something went wrong!</div>
                )}
                <input name="first" />
                <input name="last" />
                <input name="email" />
                <input name="passw" />
                <button onClick={e => this.submit()}>Join up</button>
            </div>
        );
    }
}
