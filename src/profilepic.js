import React from "react";

import style from "./styling.js";

export default function ProfilePic({
    avatar,
    first,
    last,
    clickHandler,
    avatarscale
}) {
    return (
        <div style={style.data.usericon}>
            <p>user icon here</p>
            <img
                onClick={clickHandler}
                src={avatar || "/images/placeholder.png"}
                alt={first + " " + last}
                width={avatarscale}
                height={avatarscale}
                style={style.data.avatar}
            />
        </div>
    );
}
