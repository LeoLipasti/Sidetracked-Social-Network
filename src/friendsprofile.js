import React from "react";
import axios from "./axios";

import style from "./styling.js";

import { connect } from "react-redux";

class FriendsProfile extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriends());
    }
    render() {
        const { users } = this.props;
        if (!users) {
            return null;
        }
        const friendRequesters = (
            <div style={style.data.profile}>
                {users.map(
                    user =>
                        !user.accepted && (
                            <div
                                className="user"
                                key={user.id}
                                style={{
                                    position: "absolute",
                                    left: users.indexOf(user) * 155 + "px"
                                }}
                            >
                                <div style={style.data.themetextbasic}>
                                    {user.first} {user.last}
                                </div>
                                <img
                                    src={user.avatar || "/placeholder.png"}
                                    width="150px"
                                />
                                <div
                                    style={style.data.buttonbordered}
                                    className="friendrequest"
                                    onClick={() =>
                                        this.props.dispatch(
                                            friendRequests(user.id)
                                        )
                                    }
                                >
                                    Accept friend request
                                </div>
                            </div>
                        )
                )}
            </div>
        );
        const friendUsers = (
            <div style={style.data.profile}>
                {users.map(
                    user =>
                        user.accepted && (
                            <div
                                className="user"
                                key={user.id}
                                style={{
                                    position: "absolute",
                                    left: users.indexOf(user) * 155 + "px"
                                }}
                            >
                                <div style={style.data.themetextbasic}>
                                    {user.first} {user.last}
                                </div>
                                <img
                                    src={user.avatar || "/placeholder.png"}
                                    width="150px"
                                />
                                <div
                                    style={style.data.buttonbordered}
                                    className="friendrequest"
                                    onClick={() =>
                                        this.props.dispatch(
                                            friendRequests(user.id)
                                        )
                                    }
                                >
                                    Accept friend request
                                </div>
                            </div>
                        )
                )}
            </div>
        );
        return (
            <div>
                <p style={style.data.themetext}>Incoming friend requests:</p>
                {!!users.length && friendRequesters}
                <p style={style.data.themetext}>Current friends:</p>
                {!!users.length && friendUsers}
            </div>
        );
    }
}

async function getFriends() {
    const { data } = await axios.get("/state/friendsnrequests", {
        headers: {
            getme: "friendships"
        }
    });
    return {
        type: "GET_USERS",
        users: data
    };
}

function friendRequests(id) {
    axios.post("/state/friendrequests", {
        getme: "friendships",
        id: id
    });
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

export default connect(mapStateToProps)(FriendsProfile);
