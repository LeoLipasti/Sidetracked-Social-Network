import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Link } from "react-router-dom";

import axios from "./axios";

import OtherProfile from "./otherprofile";

import ProfilePic from "./profilepic";
import Uploader from "./uploader";

import Profile from "./profile";
import EditBio from "./bioeditor";

import FriendsProfile from "./friendsprofile";

import style from "./styling.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { bioEditMode: false };
    }
    componentDidMount() {
        axios
            .get("/user", { headers: { getme: "userprofile" } })
            .then(({ data }) => {
                this.setState(data);
            });
    }
    fileUpload(file) {
        this.setState({ id: undefined });
        let formData = new FormData();
        formData.append("file", file.target.files[0]);
        formData.append("bio", this.state.bio);
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
    bioUpload() {
        this.setState({ bioEditMode: false });
        let formData = new FormData();
        formData.append("bio", this.state.bio);
        axios.post("/user", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
    render() {
        if (!this.state.id) {
            return (
                <div style={style.data.registerloginbg}>
                    <img src={"./logo.gif"} width="42px" />
                    <ProfilePic
                        displstyle={style.data.usericon}
                        avatar={"./spinner.gif"}
                        first={this.state.first}
                        last={this.state.last}
                        avatarscale={"75px"}
                    />
                </div>
            );
        }
        return (
            <div style={style.data.registerloginbg}>
                <img src={"./logo.gif"} width="42px" />
                <a href="/">Profile</a> <a href="/friends">Friends</a>
                <ProfilePic
                    displstyle={style.data.usericon}
                    avatar={this.state.avatar}
                    first={this.state.first}
                    last={this.state.last}
                    avatarscale={"75px"}
                    clickHandler={() =>
                        this.setState({ isUloaderVisible: true })
                    }
                />
                {/* Profile */}
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
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
                                                this.setState({
                                                    isUloaderVisible: true
                                                })
                                            }
                                        />
                                    }
                                    bioEditor={
                                        <EditBio
                                            bio={this.state.bio}
                                            onChangeTxt={e =>
                                                this.setState({
                                                    bio: e.target.value
                                                })
                                            }
                                            bioEditMode={this.state.bioEditMode}
                                            clickHandler={() =>
                                                this.setState({
                                                    bioEditMode: true
                                                })
                                            }
                                            postBio={() => this.bioUpload()}
                                        />
                                    }
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route
                            exact
                            path="/friends"
                            component={FriendsProfile}
                        />
                    </div>
                </BrowserRouter>
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
