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

app.post("/login", (req, res) => {
    console.log("/login post");
    if (req.session.userId) {
        console.log("/ from login");
        res.redirect("/");
    } else {
        return db
            .queryLogin(req.body.email)
            .then(results => {
                if (results.rows[0] != undefined) {
                    let password = results.rows[0].password;
                    Promise.all([
                        bc.checkPassword(req.body.password, password),
                        db.queryLoginID(req.body.email)
                    ])
                        .then(results => {
                            req.session.userId = results[1].rows[0].id;
                            res.send("success");
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send("fail");
                        });
                } else {
                    res.status(500).send("fail");
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("fail");
            });
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
    } else {
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
    }
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
