import React from "react";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Welcome to Sidetracked the Social Network!</h1>
                <p>
                    <a href={"./register"}>New User? Register here</a>
                </p>
                <p>
                    <a href={"./login"}>Login</a>
                </p>
            </div>
        );
    }
}
