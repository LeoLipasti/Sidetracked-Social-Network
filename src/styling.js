// Im planning to make different color themes but thats for bonus feature time

const topColor = "#cce6ff";
const baseColor = "#e6f7ff";
const borderColor = "white #99ccff #99ccff white";

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
        backgroundColor: topColor,
        minHeight: "200px",
        boxSizing: "border-box",
        color: "white",
        borderRadius: "5px",
        textAlign: "center"
    },
    error: {
        color: "red"
    },
    hidden: {
        display: "none"
    },
    button: { cursor: "pointer" },
    button_friendrequest: {
        width: "150px",
        height: "25px",
        backgroundColor: "black",
        color: "white",
        fontFamily: "'EB Garamond', serif",
        fontSize: "14px",
        textAlign: "center",
        paddingTop: "2px",
        cursor: "pointer"
    },
    usericon: {
        width: "100px",
        height: "100px",
        padding: "5px",
        textAlign: "center",
        display: "inline",
        float: "right"
    },
    avatar: {
        borderRadius: "10px"
    },
    uploadimage: {
        width: "550px",
        height: "180px",
        marginLeft: "calc(100%-275px)",
        backgroundColor: topColor,
        textAlign: "center",
        position: "absolute",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "5px"
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
        backgroundColor: topColor,
        borderRadius: "5px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: borderColor
    },
    profilepic: {
        width: "175px",
        height: "225px",
        display: "inline",
        float: "left",
        padding: "15px"
    },
    profilebio: {
        width: "calc(100%-150px)",
        height: "225px",
        display: "inline",
        float: "left",
        padding: "30px"
    },
    bioedit: {
        width: "200px",
        height: "125px"
    },
    biotxt: {},
    box: {
        textAlign: "right",
        marginRight: "79px",
        borderRadius: "5px"
    }
};

module.exports = { data: MainStyle };
