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
            <div>
                <p style={style.data.themetext}>Incoming friend requests:</p>
                <div style={style.data.friends}>
                    {users
                        .filter(user => !user.accepted)
                        .map((user, index) => (
                            <div
                                className="user"
                                key={user.id}
                                style={{
                                    position: "absolute",
                                    left: index * 155 + "px"
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
                        ))}
                </div>
            </div>
        );
        const friendUsers = (
            <div>
                <p style={style.data.themetext}>Current friends:</p>
                <div style={style.data.friends}>
                    {users
                        .filter(user => user.accepted)
                        .map((user, index) => (
                            <div
                                className="user"
                                key={user.id}
                                style={{
                                    position: "absolute",
                                    left: index * 155 + "px"
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
                                            friendRemoval(user.id)
                                        )
                                    }
                                >
                                    Remove from friends
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
        const noResults = (
            <div style={style.data.profile} className="infotext">
                <p>
                    Looks like you have no friends yet nor incoming friend
                    requests.
                </p>
                <p>
                    You can send friend requests yourself via other users
                    profiles.
                </p>
            </div>
        );
        return (
            <div>
                {!!users.length && friendRequesters}
                {!!users.length && friendUsers}
                {!users.length && noResults}
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

async function friendRequests(id) {
    await axios.post("/state/friendrequests", {
        getme: "friendships",
        id: id
    });
    return {
        type: "ADD_FRIEND",
        id
    };
}

async function friendRemoval(id) {
    await axios.post("/state/friendrequests", {
        getme: "friendships",
        id: id
    });
    return {
        type: "REMOVE_FRIEND",
        id
    };
}

function mapStateToProps(state) {
    return {
        users:
            state.users && state.users.filter(friend => friend.removed == null)
    };
}

export default connect(mapStateToProps)(FriendsProfile);
