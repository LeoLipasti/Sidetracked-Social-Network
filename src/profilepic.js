import React from "react";

import style from "./styling.js";

//import avatarplholder from "./images/placeholder.png";

export default function ProfilePic({ avatar, first, last, clickHandler }) {
    return (
        <div style={style.data.usericon}>
            <p>user icon here</p>
            <img
                onClick={clickHandler}
                src={avatar || "/images/placeholder.png"}
                alt={first + " " + last}
            />
        </div>
    );
}
