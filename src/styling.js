// Im planning to make different color themes but thats for bonus feature time
// readymade color themes, store selection in localStorage

const textColor = "#000033";
const errorColor = "red";
const topColor = "#99bbff";
const baseColor = "#e6f7ff";
const lowlineColor = "#99ccff";
const borderColor = "white " + lowlineColor + " " + lowlineColor + " white";
const borderButton = "silver orange orange silver";
const borderWidth = "1px";
const borderRadius = 5;

const MainStyle = {
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
        padding: "5px",
        textAlign: "center",
        display: "inline",
        float: "right"
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
        backgroundColor: topColor
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
        cursor: "pointer",
        fontFamily: "'EB Garamond', serif"
    },
    box: {
        textAlign: "right",
        marginRight: "79px",
        borderRadius: borderRadius + "px"
    },
    themetext: { color: topColor, marginLeft: "10px" },
    themetextbasic: { color: textColor, textAlign: "center" }
};

module.exports = { data: MainStyle };
