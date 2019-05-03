const express = require("express");
const app = express();
const compression = require("compression");

const db = require("./utils/db");
const bc = require("./utils/bc");

const csurf = require("csurf");

app.use(express.static("./public"));

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

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

const s3 = require("./s3");

const config = require("./config");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

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

app.post("/register", async (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        try {
            if (
                !req.body.first ||
                !req.body.last ||
                !req.body.email ||
                !req.body.passw
            ) {
                throw "empty input field(s)";
            }
            const passw = await bc.hashPassword(req.body.passw);
            const returnid = await db.createUser(
                req.body.first,
                req.body.last,
                req.body.email,
                passw
            );
            if (!returnid.rows[0].id) {
                throw "createUser not successfull";
            }
            req.session.userId = returnid.rows[0].id;
            res.send("success");
        } catch (err) {
            console.log(err);
            res.status(500).send("fail");
        }
    }
});

app.get("/static/friendrequests", checkUser, async (req, res) => {
    if (!req.headers.getme) {
        // get is not coming from app page
        console.log("request not coming from app page");
        res.redirect("/");
    } else {
        let data = {};
        const uniqcode = ["U" + req.headers.id, "U" + req.session.userId]
            .sort()
            .join("");
        try {
            const friendstatus = await db.queryFriendship(uniqcode);
            data = {
                friends: friendstatus.rows[0].accepted,
                requester: friendstatus.rows[0].requester
            };
            res.send(data);
        } catch (err) {
            // no friendship data yet
            data = { norequests: true };
            res.send(data);
        }
    }
});

app.post("/static/friendrequests", async (req, res) => {
    if (!req.body.getme) {
        // post is not coming from app page
        console.log("request not coming from app page");
        res.redirect("/");
    } else {
        let data = {};
        const uniqcode = ["U" + req.body.id, "U" + req.session.userId]
            .sort()
            .join("");
        try {
            const friendstatus = await db.queryFriendship(uniqcode);
            let requester = friendstatus.rows[0].requester;
            let receiver = friendstatus.rows[0].receiver;
            let accepted = friendstatus.rows[0].accepted;
            console.log(requester);
            console.log(receiver);
            console.log(accepted);
            if (requester == 0 || receiver == 0) {
                console.log(
                    "existing requests history but blank state - this user is now then requester"
                );
                db.friendshiplog(req.session.userId + "requested_", uniqcode);
                // existing requests history but blank state - this user is now then requester
                requester = req.session.userId;
                receiver = req.body.id;
            } else if (accepted) {
                // action is unfriend
                console.log("action is unfriend");
                db.friendshiplog(req.session.userId + "unfriended_", uniqcode);
                accepted = false;
                requester = 0;
                receiver = 0;
            } else if (requester == req.session.userId) {
                console.log("action is cancel friend request");
                // action is cancel friend request
                accepted = false;
                requester = 0;
                receiver = 0;
            } else if (requester == req.body.id) {
                console.log("action is accept friend request");
                // action is accept friend request
                accepted = true;
                db.friendshiplog(req.session.userId + "accepted_", uniqcode);
            } else {
                console.log("should not happen");
            }
            await db.modifyFriendship(uniqcode, requester, receiver, accepted);
            data = {
                friends: accepted,
                requester: requester
            };
            res.send(data);
        } catch (err) {
            // no friendship data yet - unqcode, requester, receiver, accepted , log
            try {
                await db.addFriendship(
                    uniqcode,
                    req.session.userId,
                    req.body.id,
                    false,
                    req.session.userId + "requested_"
                );
                data = {
                    friends: false,
                    requester: req.session.userId
                };
                res.send(data);
            } catch (err) {
                console.log(err);
                data = { norequests: true };
                res.send(data);
            }
        }
    }
});

app.get("/static/user/:something", checkUser, async (req, res) => {
    if (!req.headers.getme) {
        // get is not coming from app page
        console.log("request not coming from app page");
        res.redirect("/");
    } else {
        const data = {};
        try {
            const url = req.url.split("/");
            const parsedurl = parseInt(url[url.length - 1]);
            if (isNaN(parsedurl)) {
                throw "NaN";
            }
            if (req.session.userId === parsedurl) {
                throw "Ownprofile";
            }
            const founduser = await db.findUser(parsedurl);
            if (founduser.rows === undefined) {
                throw "Not Found";
            }
            data.first = founduser.rows[0].first;
            data.last = founduser.rows[0].last;
            data.avatar = founduser.rows[0].avatar;
            data.bio = founduser.rows[0].bio;
            res.send(data);
        } catch (err) {
            if (err === "Ownprofile") {
                res.send(data);
            } else {
                data.first = "User not ";
                data.last = "found.";
                data.avatar = "/usernotfound.png";
                data.bio = undefined;
                res.send(data);
            }
        }
    }
});

app.get("/user", checkUser, async (req, res) => {
    if (!req.headers.getme) {
        // user typed /user as url, output is not what we want so redirecting to /
        res.redirect("/");
    } else {
        try {
            const foundUser = await db.findUser(req.session.userId);
            const userdata = {};
            userdata.first = foundUser.rows[0].first;
            userdata.last = foundUser.rows[0].last;
            userdata.avatar = foundUser.rows[0].avatar;
            userdata.bio = foundUser.rows[0].bio;
            userdata.id = req.session.userId;
            userdata.bioEditMode = false;
            if (!userdata.first || !userdata.last) {
                throw "no first or lastname found with Id";
            }
            res.send(userdata);
        } catch (err) {
            // cookie goes wrong, mostly should happen only while testing if table is cleared or user is deleted
            console.log(
                "cookie error: " +
                    err +
                    " !!! Cookie now changed to undefined for a userId: " +
                    req.session.userId
            );
            req.session.userId = undefined;
            res.redirect("/welcome");
        }
    }
});

app.post("/user", checkUser, uploader.single("file"), s3.upload, async function(
    req,
    res
) {
    if (req.body != undefined) {
        db.updateBio(req.body.bio, req.session.userId);
    }
    if (req.file != undefined) {
        try {
            const url = config.s3Url + req.file.filename;
            await db.updateAvatar(url, req.session.userId);
            res.json({
                data: { url: url, id: req.session.userId }
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        // bio was updated / no file upload
        res.sendStatus(200);
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

function checkUser(req, res, next) {
    if (!req.session.userId) {
        res.sendStatus(403);
    } else {
        next();
    }
}
