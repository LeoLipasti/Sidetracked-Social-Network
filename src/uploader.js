import React from "react";

import style from "./styling.js";

export default function Uploader({ clickHandler, fileChange, avatar }) {
    return (
        <div style={style.data.uploadimage}>
            Upload your own avatar or choose one below
            <label htmlFor="file-upload">
                <img src={avatar || "/images/placeholder.png"} />
            </label>
            <input id="file-upload" type="file" onChange={e => fileChange(e)} />
            <div onClick={clickHandler} style={style.data.uploadimage_close}>
                X
            </div>
        </div>
    );
}
