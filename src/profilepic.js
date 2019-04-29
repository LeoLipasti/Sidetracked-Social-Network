import React from "react";

import style from "./styling.js";

//import avatarplholder from "./images/placeholder.png";

export default function ProfilePic({
    avatar,
    first,
    last,
    clickHandler,
    imgscale
}) {
    return (
        <div style={style.data.usericon}>
            <p>user icon here</p>
            <img
                onClick={clickHandler}
                src={avatar || "/images/placeholder.png"}
                alt={first + " " + last}
                width={imgscale}
                height={imgscale}
            />
        </div>
    );
}
