import React from "react";
import ReactDOM from "react-dom";

import axios from "./axios";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";

import Profile from "./profile";
import EditBio from "./bioeditor";

import style from "./styling.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bioEditMode: false };
        console.log(this.state.bioEditMode);
    }
    componentDidMount() {
        axios.get("/user").then(({ data }) => {
            this.setState(data);
            console.log(this.state.bioEditMode);
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
    textUpload(txt) {
        let formData = new FormData();
        formData.append("txt", txt);
        axios.post("/user", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
    render() {
        if (!this.state.id) {
            return <img src={"./logo.gif"} width="22px" />;
            // TODO return <img src="/spinner.gif">
        }
        return (
            <div style={style.data.appbody}>
                <img src={"./logo.gif"} width="22px" />
                <ProfilePic
                    avatar={this.state.avatar}
                    first={this.state.first}
                    last={this.state.last}
                    avatarscale={"75px"}
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
                            avatarscale={"150px"}
                            clickHandler={() =>
                                this.setState({ isUloaderVisible: true })
                            }
                        />
                    }
                    bioEditor={
                        <EditBio
                            bio={this.state.bio}
                            avatarscale={"150px"}
                            onChangeTxt={e => this.setState({ bio: e.value })}
                            bioEditMode={this.state.bioEditMode}
                            clickHandler={() =>
                                this.setState({ bioEditMode: true })
                            }
                        />
                    }
                />

                {this.state.isUloaderVisible && (
                    <Uploader
                        clickHandler={() =>
                            this.setState({ isUloaderVisible: false })
                        }
                        fileChange={e => this.fileUpload(e)}
                        avatar={this.state.avatar}
                        avatarscale={"75px"}
                    />
                )}
            </div>
        );
    }
}
