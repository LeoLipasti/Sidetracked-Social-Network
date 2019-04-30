import React from "react";
import axios from "./axios";

import ProfilePic from "./profilepic";

import style from "./styling.js";

export default class OtherProfile extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(id);
    }
    render() {
        return <div>hello!</div>;
    }
}
