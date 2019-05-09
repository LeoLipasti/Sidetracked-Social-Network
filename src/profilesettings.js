import React from "react";

import style from "./styling.js";

export default function Profile() {
    return (
        <div style={style.data.settingspull}>
            <div style={style.data.stylebox}>Personal Theme</div>
            <div
                style={style.data.stylebox1}
                onClick={() => localStorage.setItem("STstyle", "default")}
            />
            <div
                style={style.data.stylebox2}
                onClick={() => localStorage.setItem("STstyle", "orange")}
            />
            <div
                style={style.data.stylebox3}
                onClick={() => localStorage.setItem("STstyle", "black")}
            />
            <div
                style={style.data.stylebox4}
                onClick={() => localStorage.setItem("STstyle", "newretro")}
            />
            <div
                style={style.data.stylebox5}
                onClick={() => localStorage.setItem("STstyle", "white")}
            />
        </div>
    );
}
