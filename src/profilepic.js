import React from "react";

import style from "./styling.js";

export default function ProfilePic({ avatar, first, last, clickHandler }) {
    return (
        <div style={style.data.usericon}>
            <p>
                {first} {last}
            </p>
            <img
                onClick={clickHandler}
                src={avatar || "/images/placeholder.jpg"}
            />
        </div>
    );
}
