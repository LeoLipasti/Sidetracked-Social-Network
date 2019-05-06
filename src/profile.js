import React from "react";

import style from "./styling.js";

export default function Profile(props) {
    return (
        <div>
            <div style={style.data.profile}>
                <div className="profilepic">{props.profilePic}</div>
                <div className="profilebio">{props.bioEditor}</div>
            </div>
            <div style={style.data.settings}>
                <div className="profilesettings">{props.pSettings}</div>
            </div>
        </div>
    );
}
