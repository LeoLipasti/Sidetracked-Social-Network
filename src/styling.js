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
    body: {
        width: "100vw",
        height: "100vh",
        backgroundColor: baseColor
    },
    userbox: {
        width: "400px",
        height: "500px",
        margin: "auto",
        minHeight: "200px",
        boxSizing: "border-box",
        color: textColor,
        borderRadius: borderRadius + "px",
        textAlign: "center",
        backgroundColor: topColor
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
        marginLeft: "calc(100%-275px)",
        textAlign: "center",
        position: "absolute",
        border: "1px solid black",
        padding: "5px",
        borderRadius: borderRadius + "px",
        backgroundColor: topColor
    },
    uploadimage_close: {
        width: "16px",
        height: "16px",
        textAlign: "right",
        position: "absolute",
        top: "0",
        right: "5px"
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
    box: {
        textAlign: "right",
        marginRight: "79px",
        borderRadius: borderRadius + "px"
    }
};

module.exports = { data: MainStyle };
