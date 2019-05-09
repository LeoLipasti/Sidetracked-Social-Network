import React from "react";

import style from "./styling.js";

import store from "./start";

import { Link } from "react-router-dom";

export default class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        store.subscribe(() => {
            console.log(store.getState());
            this.setState({
                users: store.getState().onlineusers
            });
        });
    }
    render() {
        if (!this.state.users) {
            return <div>Null</div>;
        }
        const onlineusers = (
            <div>
                <p style={style.data.themetext}>
                    Users who are online right now :
                </p>
                <div>
                    {this.state.users.map(user => (
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
        return <div>{!!this.state.users.length && onlineusers}</div>;
    }
}
