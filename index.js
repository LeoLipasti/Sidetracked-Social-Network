const express = require("express");
const app = express();
const compression = require("compression");

const db = require("./utils/db");
const bc = require("./utils/bc");

csurf = require("csurf");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// COOKIE SESSION ////// COOKIE SESSION ////// COOKIE SESSION ////
const cookieSession = require("cookie-session");
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

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

// LOGIN //// LOGIN //// LOGIN //// LOGIN //

app.get("/login", (req, res) => {
    console.log(req.session.userId);
    if (req.session.userId) {
        console.log("/ from login");
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", async (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        try {
            const logindata = await db.queryLogin(req.body.email);
            if (!logindata.rows[0]) {
                throw "no results for email";
            }
            if (!req.body.passw) {
                throw "no password from user";
            }
            const passw = logindata.rows[0].password;
            const checkpass = bc.checkPassword(req.body.passw, passw);
            const loginId = db.queryLoginID(req.body.email);
            const returnpromises = {
                checkpassProm: await checkpass,
                checkloginProm: await loginId
            };
            if (!returnpromises.checkpassProm) {
                throw "wrong password";
            }
            req.session.userId = returnpromises.checkloginProm.rows[0].id;
            res.send("success");
        } catch (err) {
            console.log(err);
            res.status(500).send("fail");
        }
    }
});

// REGISTER //// REGISTER //// REGISTER //

app.get("/register", (req, res) => {
    if (req.session.userId) {
        console.log("/ from register");
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    console.log("/register post");
    if (req.session.userId) {
        console.log("/ from register");
        res.redirect("/");
    } else if (
        req.body.first &&
        req.body.last &&
        req.body.email &&
        req.body.passw
    ) {
        return bc
            .hashPassword(req.body.passw)
            .then(results => {
                console.log("never null: " + results);
                db.createUser(
                    req.body.first,
                    req.body.last,
                    req.body.email,
                    results
                ).then(returnid => {
                    console.log(returnid.rows);
                    console.log(returnid.rows[0].id);
                    req.session.userId = returnid.rows[0].id;
                    res.send("success");
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("fail");
            });
    } else {
        console.log(err);
        res.status(500).send("fail");
    }
});

app.get("/user", (req, res) => {
    if (req.session.userId) {
        db.findUser(req.session.userId)
            .then(returndata => {
                var userdata = {};
                userdata.first = returndata.rows[0].first;
                userdata.last = returndata.rows[0].last;
                userdata.avatar = returndata.rows[0].avatar;
                if (userdata.first && userdata.last) {
                    res.send(userdata);
                } else {
                    // cookie goes wrong, mostly should happen only while testing if table is cleared or user is deleted
                    console.log(
                        "cookie error: couldnt get first, last by userId. Cookie now changed to undefined for a user"
                    );
                    req.session.userId = undefined;
                    res.redirect("/welcome");
                }
            })
            .catch(() => {
                // cookie goes wrong, mostly should happen only while testing if table is cleared or user is deleted
                console.log(
                    "cookie error: couldnt get first, last by userId. Cookie now changed to undefined for a user"
                );
                req.session.userId = undefined;
                res.redirect("/welcome");
            });
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/logout", (req, res) => {
    req.session.userId = undefined;
    res.redirect("/welcome");
});

// * //// * //// * //// * //// * //// * //

app.get("*", (req, res) => {
    console.log("* :" + req.url);
    if (!req.session.userId) {
        console.log("redirect to welcome");
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

if (require.main == module) {
    app.listen(process.env.PORT || 8080, () =>
        console.log("SocialNetwork-Sidetracked")
    );
}
