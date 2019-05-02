import React from "react";

import style from "./styling.js";

export default function FriendRequester({ clickHandler, status }) {
    return (
        <div style={style.data.button_friendrequest} onClick={clickHandler}>
            Send Friend Request
        </div>
    );
}
