import React from "react";
import axios from "./axios";

import Profile from "./profile";
import ProfilePic from "./profilepic";

import style from "./styling.js";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get("/static/user/" + id, { headers: { getme: "userprofile" } })
            .then(({ data }) => {
                this.setState(data);
            });
    }
    render() {
        return (
            <div style={style.data.profile}>
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
                        />
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
    }
}
