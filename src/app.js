import React from "react";
import ReactDOM from "react-dom";

import axios from "./axios";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";

import Profile from "./profile";
import BioEditor from "./bioeditor";

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
    fileUpload(file) {
        this.setState({ id: undefined });
        let formData = new FormData();
        formData.append("file", file.target.files[0]);
        axios
            .post("/user", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(url => {
                this.setState({ avatar: url });
                location.replace("/");
            })
            .catch(() => {
                this.setState({ error: "error" });
            });
    }
    render() {
        if (!this.state.id) {
            return <img src={"./logo.gif"} />;
            //or return <img src="/spinner.gif">
        }
        return (
            <div style={style.data.appbody}>
                <img src={"./logo.gif"} />
                <ProfilePic
                    avatar={this.state.avatar}
                    first={this.state.first}
                    last={this.state.last}
                    imgscale={"75px"}
                    clickHandler={() =>
                        this.setState({ isUloaderVisible: true })
                    }
                />
                {/* Profile */}
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={
                        <ProfilePic
                            id={this.state.id}
                            avatar={this.state.avatar}
                            first={this.state.first}
                            last={this.state.last}
                            imgscale={"150px"}
                            clickHandler={() =>
                                this.setState({ isUloaderVisible: true })
                            }
                        />
                    }
                    bioEditor={<BioEditor bio={this.state.bio} />}
                />

                {this.state.isUloaderVisible && (
                    <Uploader
                        clickHandler={() =>
                            this.setState({ isUloaderVisible: false })
                        }
                        fileChange={e => this.fileUpload(e)}
                        avatar={this.state.avatar}
                        imgscale={"150px"}
                    />
                )}
            </div>
        );
    }
}
