import React from "react";

import style from "./styling.js";

export default function Profile(props) {
    return (
        <div style={style.data.profile}>
            <div className="profilepic">{props.profilePic}</div>
            <div className="profilebio">{props.bioEditor}</div>
        </div>
    );
}
