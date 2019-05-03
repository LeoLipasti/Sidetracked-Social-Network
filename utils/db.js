var spicedPg = require("spiced-pg");

var db;
const { localdataBase } = require("../secret");
db = spicedPg(localdataBase());
//db = spicedPg(process.env.DATABASE_URL);

exports.createUser = function createUser(first, last, email, passw) {
    let q = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`;
    let params = [first, last, email, passw];
    return db.query(q, params);
};

exports.updateAvatar = function updateAvatar(url, id) {
    let q = `UPDATE users SET avatar = $1 WHERE id=$2`;
    let params = [url, id];
    return db.query(q, params);
};

exports.updateBio = function updateBio(url, id) {
    let q = `UPDATE users SET bio = $1 WHERE id=$2`;
    let params = [url, id];
    return db.query(q, params);
};

exports.findUser = function findUser(id) {
    let q = `SELECT firstname AS first, lastname AS last, avatar, bio FROM users WHERE id=$1`;
    let params = [id];
    return db.query(q, params);
};

exports.queryLogin = function queryLogin(email) {
    let q = `SELECT password,id FROM users WHERE lower(email) = lower($1)`;
    let params = [email];
    return db.query(q, params);
};

exports.queryLoginID = function queryLoginID(email) {
    let q = `SELECT id FROM users WHERE lower(email) = lower($1)`;
    let params = [email];
    return db.query(q, params);
};

exports.queryFriendship = function queryFriendship(uniqcode) {
    let q = `SELECT accepted, requester, receiver FROM friendships WHERE uniqcode = $1`;
    let params = [uniqcode];
    return db.query(q, params);
};

exports.modifyFriendship = function modifyFriendship(
    uniqcode,
    requester,
    receiver,
    accepted
) {
    let q = `INSERT INTO friendships (uniqcode, requester, receiver, accepted) VALUES ($1, $2, $3, $4)`;
    let params = [uniqcode, requester, receiver, accepted];
    return db.query(q, params);
};

exports.friendshiplog = function friendshiplog(log, uniqcode) {
    let q = `UPDATE friendships SET statushistory = statushistory + $1 WHERE uniqcode=$2`;
    let params = [log, uniqcode];
    return db.query(q, params);
};
