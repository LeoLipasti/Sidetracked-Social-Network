import React from "react";

import style from "./styling.js";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.users) {
            return <div />;
        }
        const onlineusers = (
            <div>
                <p style={style.data.themetext}>
                    Users who are online right now :
                </p>
                <div style={style.data.longbox}>
                    {this.props.users.map(user => (
                        <div key={user.id} className="onlineusers">
                            <Link to={"/user/" + user.id}>
                                <div style={style.data.themetextsmall}>
                                    {user.firstname} {user.lastname}
                                </div>
                                <img
                                    src={user.avatar || "/placeholder.png"}
                                    width="75px"
                                    style={style.data.avatar}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
        return <div>{!!this.props.users.length && onlineusers}</div>;
    }
}

function mapStateToProps(state) {
    // state refers to global redux state
    return {
        users: state.onlineusers && state.onlineusers
    };
}

export default connect(mapStateToProps)(OnlineUsers);
