import React from "react";

import style from "./styling.js";

export default function BioEditor(bio, clickHandler, bioEditMode, onChangeTxt) {
    if (bioEditMode === true) {
        return (
            <div style={style.data.bioedit}>
                <textarea rows="5" cols="50" onChange={e => onChangeTxt(e)} />
                <button />
            </div>
        );
    } else if (bio.bio != undefined) {
        return (
            <div style={style.data.biotxt}>
                <div>
                    {bio.bio}
                    <p onClick={clickHandler}>{"[ Edit ]"}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div onClick={clickHandler} style={style.data.biotxt}>
                <div>write a short bio and describe yourself to others!</div>
            </div>
        );
    }
}
