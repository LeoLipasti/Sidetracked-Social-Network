import React from "react";

import style from "./styling.js";

export default function Uploader({
    clickHandler,
    fileChange,
    avatar,
    avatarscale
}) {
    return (
        <div style={style.data.uploadimage}>
            <p className="infotext">
                Upload your own avatar or choose one below
            </p>
            <label htmlFor="file-upload">
                <img
                    src={avatar || "/images/placeholder.png"}
                    width={avatarscale}
                    height={avatarscale}
                    style={style.data.avatar}
                />
            </label>
            <input
                id="file-upload"
                type="file"
                onChange={e => fileChange(e)}
                style={style.data.hidden}
            />
            <div onClick={clickHandler} style={style.data.uploadimage_close}>
                X
            </div>
        </div>
    );
}
