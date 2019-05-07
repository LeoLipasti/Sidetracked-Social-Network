import React from "react";

import style from "./styling.js";

import { connect } from "react-redux";

import { getFriends, friendRequests, friendRemoval } from "./actions";

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

function mapStateToProps(state) {
    return {
        users:
            state.users && state.users.filter(friend => friend.removed == null)
    };
}

export default connect(mapStateToProps)(FriendsProfile);
