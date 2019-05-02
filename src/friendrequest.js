import React from "react";

import style from "./styling.js";

export default function FriendRequester({ clickHandler, status }) {
    if (status === "friends") {
        return (
            <div style={style.data.button_friendrequest} onClick={clickHandler}>
                Remove from Friends
            </div>
        );
    } else if (status === "notfriends") {
        return (
            <div style={style.data.button_friendrequest} onClick={clickHandler}>
                Send Friend Request
            </div>
        );
    } else if (status === "requestsent") {
        return (
            <div style={style.data.button_friendrequest} onClick={clickHandler}>
                Cancel Friend Request
            </div>
        );
    } else if (status === "acceptrequest") {
        return (
            <div style={style.data.button_friendrequest} onClick={clickHandler}>
                Accept Friend Request
            </div>
        );
    } else {
        // request response not ready
        return <div />;
    }
}
