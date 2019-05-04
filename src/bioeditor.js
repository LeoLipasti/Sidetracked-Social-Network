import React from "react";

import style from "./styling.js";

export default function EditBio({
    clickHandler,
    bioEditMode,
    bio,
    onChangeTxt,
    postBio
}) {
    if (bio != undefined && !bioEditMode) {
        return (
            <div>
                {bio}
                <p
                    onClick={clickHandler}
                    className="infotext"
                    style={style.data.button}
                >
                    {"[ Edit ]"}
                </p>
            </div>
        );
    } else if (!bioEditMode) {
        return (
            <div>
                <p
                    onClick={clickHandler}
                    className="infotext"
                    style={style.data.button}
                >
                    write a short bio and describe yourself to others!
                </p>
            </div>
        );
    } else {
        return (
            <div className="bioedit">
                <textarea
                    rows="5"
                    value={bio}
                    cols="50"
                    onChange={e => onChangeTxt(e)}
                />
                <button onClick={postBio} style={style.data.button}>
                    Update
                </button>
            </div>
        );
    }
}
