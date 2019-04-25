const express = require("express");
const app = express();
const compression = require("compression");

const db = require("./utils/db");
const bc = require("./utils/bc");
const cookieSession = require("cookie-session");

//app.use(
//    require("body-parser").urlencoded({
//        extended: false
//    })
//);
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// COOKIE SESSION ////// COOKIE SESSION ////// COOKIE SESSION ////
const { cookieData } = require("./cookies");
var secret = cookieData();
//secret = process.env.SESSION_SECRET;
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secret: secret
    })
);
// COOKIE SESSION ////// COOKIE SESSION ////// COOKIE SESSION ////

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    console.log(req.session.userId);
    if (req.session.userId) {
        console.log("/ from welcome");
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/register", (req, res) => {
    if (req.session.userId) {
        console.log("/ from register");
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log(req.body);
    console.log("/register post");
    if (req.session.userId) {
        console.log("/ from register");
        res.redirect("/");
    } else {
        console.log("body: " + req.body.email);
        console.log("body: " + req.body.last);
        console.log("body: " + req.body.first);
        console.log("body: " + req.body.passw);
        return bc
            .hashPassword(req.body.passw)
            .then(results => {
                db.createUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    results
                );
            })
            .then(results => {
                res.send(results);
            });
    }
});

app.get("*", (req, res) => {
    console.log("* :" + req.url);
    if (!req.session.userId) {
        console.log("redirect to welcome");
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//app.listen(8080, function() {
//    console.log("I'm listening.");
//});
if (require.main == module) {
    app.listen(process.env.PORT || 8080, () =>
        console.log("SocialNetwork-Sidetracked")
    );
}
