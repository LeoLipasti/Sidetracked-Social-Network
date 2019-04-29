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

function textUpload(txt) {
    let formData = new FormData();
    formData.append("txt", txt);
    axios.post("/user", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}
