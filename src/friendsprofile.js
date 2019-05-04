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
        const friendUsers = (
            <div className="users">
                {users.map(user => (
                    <div className="user" key={user.id}>
                        <img src={user.avatar} />
                        <div
                            style={style.data.buttonbordered}
                            className="friendrequest"
                        >
                            <button
                                onClick={() =>
                                    this.props.dispatch(friendRequests(user.id))
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
        return (
            <div>
                Pending friend requests:
                {!!users.length && friendUsers}
            </div>
        );
    }
}

async function getFriends() {
    const { data } = await axios.get("/friends");
    return {
        type: "GET_USERS",
        users: data.users
    };
}

function friendRequests(id) {
    axios.post("/state/friendrequests", {
        headers: {
            getme: "friendships",
            id: id
        }
    });
}

function mapStateToProps(state) {
    return {
        // filter the relevant users // this page is wannabe friends
        users: state.users && state.users.filter(user => user.hot)
    };
}

export default connect(mapStateToProps)(FriendsProfile);
