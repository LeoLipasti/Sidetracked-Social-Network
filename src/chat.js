import React from "react";

import style from "./styling.js";

import { connect } from "react-redux";

class Chat extends React.Component {
    render() {
        return <div />;
    }
}

function mapStateToProps(state) {
    return {
        users:
            state.users &&
            state.users.filter(users => users.disconnected == null)
    };
}

export default connect(mapStateToProps)(Chat);
