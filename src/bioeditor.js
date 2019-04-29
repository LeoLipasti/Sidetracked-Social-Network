import React from "react";

import style from "./styling.js";

export default function BioEditor({ onChangeHandler }) {
    return (
        <div style={style.data.bioedit}>
            <input type="textarea" cols="40" rows="5" />
        </div>
    );
}
