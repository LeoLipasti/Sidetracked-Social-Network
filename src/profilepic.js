import React from "react";

import style from "./styling.js";

export default function ProfilePic({
    avatar,
    first,
    last,
    clickHandler,
    avatarscale,
    displstyle
}) {
    return (
        <div style={displstyle}>
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
