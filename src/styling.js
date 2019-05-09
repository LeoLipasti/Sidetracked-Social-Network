// readymade color themes, store selection in localStorage

let textColor = "#000033";
let errorColor = "red";
let topColor = "#99bbff";
let baseColor = "#e6f7ff";
let lowlineColor = "#99ccff";
let borderColor = "white " + lowlineColor + " " + lowlineColor + " white";
let borderButton = "silver orange orange silver";
let borderWidth = "1px";
let borderRadius = 5;

if (localStorage.getItem("STstyle") === "orange") {
    textColor = "#000033";
    errorColor = "red";
    topColor = "#ffcc66";
    baseColor = "#ff9933";
    lowlineColor = "#cc6600";
    borderColor = "white " + lowlineColor + " " + lowlineColor + " white";
    borderButton = "silver orange orange silver";
    borderWidth = "1px";
    borderRadius = 8;
}

if (localStorage.getItem("STstyle") === "black") {
    textColor = "white";
    errorColor = "red";
    topColor = "black";
    baseColor = "#ffcc66";
    lowlineColor = "#cc6600";
    borderColor = "yellow " + lowlineColor + " " + lowlineColor + " yellow";
    borderButton = "silver orange orange silver";
    borderWidth = "1px";
    borderRadius = 4;
}

if (localStorage.getItem("STstyle") === "newretro") {
    textColor = "#330033";
    errorColor = "red";
    topColor = "#b3b3ff";
    baseColor = "#a64dff";
    lowlineColor = "white";
    borderColor = "white " + lowlineColor + " " + lowlineColor + " white";
    borderButton = "silver orange orange silver";
    borderWidth = "1px";
    borderRadius = 10;
}

if (localStorage.getItem("STstyle") === "white") {
    textColor = "white";
    errorColor = "red";
    topColor = "#595959";
    baseColor = "#f2f2f2";
    lowlineColor = "white";
    borderColor = "orange " + lowlineColor + " " + lowlineColor + " orange";
    borderButton = "silver orange orange silver";
    borderWidth = "1px";
    borderRadius = 2;
}

const MainStyle = {
    stylebox: {
        display: "inline-block",
        width: "auto",
        height: "20px",
        marginRight: "10px"
    },
    stylebox1: {
        width: "20px",
        height: "20px",
        backgroundColor: "#e6f7ff",
        display: "inline-block",
        borderRadius: "4px",
        marginLeft: "2px"
    },
    stylebox2: {
        width: "20px",
        height: "20px",
        backgroundColor: "#ffcc66",
        display: "inline-block",
        borderRadius: "4px",
        marginLeft: "2px"
    },
    stylebox3: {
        width: "20px",
        height: "20px",
        backgroundColor: "black",
        display: "inline-block",
        borderRadius: "4px",
        marginLeft: "2px"
    },
    stylebox4: {
        width: "20px",
        height: "20px",
        backgroundColor: "#a64dff",
        display: "inline-block",
        borderRadius: "4px",
        marginLeft: "2px"
    },
    stylebox5: {
        width: "20px",
        height: "20px",
        backgroundColor: "#595959",
        display: "inline-block",
        borderRadius: "4px",
        marginLeft: "2px"
    },
    registerloginbg: {
        width: "100vw",
        height: "100vh",
        position: "absolute",
        backgroundColor: baseColor
    },
    userbox: {
        width: "400px",
        height: "600px",
        margin: "auto",
        minHeight: "200px",
        boxSizing: "border-box",
        color: textColor,
        textAlign: "center",
        backgroundColor: topColor,
        borderRadius: borderRadius * 2 + "px",
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor
    },
    error: {
        color: errorColor
    },
    hidden: {
        display: "none"
    },
    button: {
        cursor: "pointer"
    },
    buttonbordered: {
        cursor: "pointer",
        borderColor: borderButton,
        borderStyle: "solid",
        borderWidth: "1px"
    },
    usericon: {
        // DO NOT MOVE THIS TO CSS FILES !
        // This style is passed into avatar pics
        // as parameter, check app for details
        width: "100px",
        height: "100px",
        padding: "2px",
        textAlign: "center",
        position: "absolute",
        right: "0",
        top: "0"
        // DO NOT MOVE THIS TO CSS FILES !
        // This style is passed into avatar pics
        // as parameter, check app for details
    },
    avatar: {
        borderRadius: borderRadius * 4 + "px",
        borderStyle: "solid",
        backgroundColor: lowlineColor,
        borderWidth: borderWidth,
        borderColor: borderColor
    },
    uploadimage: {
        width: "550px",
        height: "180px",
        marginLeft: "calc(50% - 275px)",
        textAlign: "center",
        position: "absolute",
        top: "35px",
        borderStyle: "solid",
        backgroundColor: topColor,
        borderWidth: borderWidth,
        borderColor: borderColor,
        padding: "5px",
        borderRadius: borderRadius + "px",
        boxShadow: "-1px -4px 15px white"
    },
    uploadimage_close: {
        width: "16px",
        height: "16px",
        textAlign: "right",
        position: "absolute",
        top: "0",
        right: "5px",
        cursor: "pointer"
    },
    profile: {
        width: "100%",
        height: "225px",
        boxShadow: "-1px -4px 15px " + lowlineColor,
        borderStyle: "solid",
        borderRadius: borderRadius + "px",
        borderWidth: borderWidth,
        borderColor: borderColor,
        backgroundColor: topColor,
        color: textColor
    },
    friends: {
        width: "100vw",
        height: "225px",
        boxShadow: "-1px -4px 15px " + lowlineColor,
        borderStyle: "solid",
        borderRadius: borderRadius + "px",
        borderWidth: borderWidth,
        borderColor: borderColor,
        backgroundColor: topColor
    },
    settingspull: {
        width: "100%",
        height: "25px",
        boxShadow: "-1px -4px 15px " + lowlineColor,
        borderStyle: "solid",
        borderRadius: borderRadius + "px",
        borderWidth: borderWidth,
        borderColor: borderColor,
        backgroundColor: topColor,
        color: textColor,
        fontFamily: "'EB Garamond', serif"
    },
    box: {
        textAlign: "right",
        marginRight: "79px",
        borderRadius: borderRadius + "px"
    },
    themetext: { color: topColor, marginLeft: "10px" },
    themetextbasic: { color: textColor, textAlign: "center" },
    themetextsmall: {
        color: textColor,
        textAlign: "center",
        fontSize: "12px",
        width: "75px"
    },
    longbox: {
        width: "100%",
        height: "100vh",
        boxShadow: "-1px -4px 15px " + lowlineColor,
        borderStyle: "solid",
        borderRadius: borderRadius + "px",
        borderWidth: borderWidth,
        borderColor: borderColor,
        backgroundColor: topColor
    },
    chatbg: {
        width: "400px",
        height: "500px",
        margin: "auto",
        minHeight: "200px",
        boxSizing: "border-box",
        color: textColor,
        textAlign: "center",
        boxShadow: "-1px -4px 15px " + lowlineColor,
        backgroundColor: topColor,
        borderRadius: borderRadius * 2 + "px",
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor
    }
};

module.exports = { data: MainStyle };
