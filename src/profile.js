import React from "react";

import style from "./styling.js";

export default function Profile(props) {
    return (
        <div style={style.data.profile}>
            {props.profilePic}
            {props.bioEditor}
        </div>
    );
}
