import React from "react";
import axios from "./axios";

import Profile from "./profile";
import ProfilePic from "./profilepic";
import FriendRequester from "./friendrequest";

import { Redirect } from "react-router-dom";

import style from "./styling.js";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ownid: false, status: "notrequested" };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get("/static/user/" + id, { headers: { getme: "userprofile" } })
            .then(({ data }) => {
                this.setState(data);
                if (this.state.first === undefined) {
                    this.setState({ ownid: true });
                } else {
                    this.friendRequests();
                }
            });
    }
    friendRequests(action) {
        if (!action) {
            axios
                .get("/static/friendrequests", {
                    headers: {
                        getme: "friendships",
                        id: this.props.match.params.id
                    }
                })
                .then(({ data }) => {
                    if (!data.norequests) {
                        if (!data.friends) {
                            if (data.requester === this.props.match.params.id) {
                                this.setState({ status: "acceptrequest" });
                            } else if (data.requester != 0) {
                                this.setState({ status: "requestsent" });
                            } else {
                                this.setState({ status: "notfriends" });
                            }
                        } else {
                            this.setState({ status: "friends" });
                        }
                    } else {
                        this.setState({ status: "notfriends" });
                    }
                });
        } else {
            // action = POST
            this.setState({ status: "pendingrequest" });
            axios
                .post("/static/friendrequests", {
                    getme: "friendships",
                    id: this.props.match.params.id
                })
                .then(({ data }) => {
                    if (!data.norequests) {
                        if (!data.friends) {
                            if (data.requester === this.props.match.params.id) {
                                this.setState({ status: "acceptrequest" });
                            } else if (data.requester != 0) {
                                this.setState({ status: "requestsent" });
                            } else {
                                this.setState({ status: "notfriends" });
                            }
                        } else {
                            this.setState({ status: "friends" });
                        }
                    } else {
                        this.setState({ status: "notfriends" });
                    }
                });
        }
    }
    render() {
        if (!this.state.ownid) {
            return (
                <div style={style.data.profile}>
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        profilePic={
                            <div>
                                <ProfilePic
                                    id={this.props.match.params.id}
                                    avatar={this.state.avatar}
                                    first={this.state.first}
                                    last={this.state.last}
                                    avatarscale={"150px"}
                                />
                                <FriendRequester
                                    status={this.state.status}
                                    clickHandler={() =>
                                        this.friendRequests("action")
                                    }
                                />
                            </div>
                        }
                        bioEditor={
                            <div style={style.data.biotxt}>
                                <p>
                                    {this.state.first} {this.state.last}
                                </p>
                                <p>{this.state.bio}</p>
                            </div>
                        }
                    />
                </div>
            );
        } else {
            return <Redirect to="/" />;
        }
    }
}
