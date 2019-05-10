import React from "react";

import style from "./styling.js";

export default function Profile() {
    return (
        <div style={style.data.settingspull}>
            <div style={style.data.stylebox}>Personal Theme</div>
            <div
                style={style.data.stylebox1}
                onClick={() => setstyle("default")}
            />
            <div
                style={style.data.stylebox2}
                onClick={() => setstyle("orange")}
            />
            <div
                style={style.data.stylebox3}
                onClick={() => setstyle("black")}
            />
            <div
                style={style.data.stylebox4}
                onClick={() => setstyle("newretro")}
            />
            <div
                style={style.data.stylebox5}
                onClick={() => setstyle("white")}
            />
        </div>
    );
}

function setstyle(style) {
    localStorage.setItem("STstyle", style);
    location.reload();
}
