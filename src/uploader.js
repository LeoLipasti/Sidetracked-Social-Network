import React from "react";

import style from "./styling.js";

export default function Uploader({
    clickHandler,
    fileChange,
    fileChangeDefaults,
    avatar,
    avatarscale
}) {
    return (
        <div style={style.data.uploadimage}>
            <p className="infotext">
                Upload your own avatar or choose one below
            </p>
            <div style={{ marginRight: avatarscale }}>
                <img
                    src={"/avatars/gia.png"}
                    width={avatarscale}
                    height={avatarscale}
                    style={style.data.avatar}
                    onClick={() => fileChangeDefaults("/avatars/gia.png")}
                />
                <img
                    src={"/avatars/helga.png"}
                    width={avatarscale}
                    height={avatarscale}
                    style={style.data.avatar}
                    onClick={() => fileChangeDefaults("/avatars/helga.png")}
                />
                <img
                    src={"/avatars/kazek.png"}
                    width={avatarscale}
                    height={avatarscale}
                    style={style.data.avatar}
                    onClick={() => fileChangeDefaults("/avatars/kazek.png")}
                />
                <img
                    src={"/avatars/lion.png"}
                    width={avatarscale}
                    height={avatarscale}
                    style={style.data.avatar}
                    onClick={() => fileChangeDefaults("/avatars/lion.png")}
                />
                <img
                    src={"/avatars/peterson.png"}
                    width={avatarscale}
                    height={avatarscale}
                    style={style.data.avatar}
                    onClick={() => fileChangeDefaults("/avatars/peterson.png")}
                />
                <label htmlFor="file-upload">
                    <img
                        src={avatar || "/placeholder.png"}
                        width={avatarscale}
                        height={avatarscale}
                        style={{ opacity: 0.5, borderRadius: "20px" }}
                    />
                    <img
                        src={"/uploadarrow.png"}
                        width="40px"
                        height="40px"
                        style={style.data.avatar}
                    />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={e => fileChange(e)}
                    style={style.data.hidden}
                />
            </div>
            <p className="infotext">upload only images less than 2MB</p>
            <div onClick={clickHandler} style={style.data.uploadimage_close}>
                X
            </div>
        </div>
    );
}
