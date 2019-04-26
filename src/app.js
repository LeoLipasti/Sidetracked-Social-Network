import React from "react";
import ReactDOM from "react-dom";

import axios from "./axios";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";

import style from "./styling.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
        });
    }
    render() {
        //if (!this.state.id) {
        //    return null;
        // or return <img src="/spinner.gif">
        //}
        return (
            <div style={style.data.appbody}>
                <img src="/logo.gif" />
                <ProfilePic
                    avatar={this.state.avatar}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={() =>
                        this.setState({ isUloaderVisible: true })
                    }
                />
                {this.state.isUloaderVisible && (
                    <Uploader setAvatar={avatar => this.setState({ avatar })} />
                )}
            </div>
        );
    }
}
