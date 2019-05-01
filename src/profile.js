import React from "react";

import style from "./styling.js";

export default function Profile(props) {
    return (
        <div style={style.data.profile}>
            <div style={style.data.profilepic}>{props.profilePic}</div>
            <div style={style.data.profilebio}>{props.bioEditor}</div>
        </div>
    );
}
