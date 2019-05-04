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

exports.queryAllFriendships = function queryAllFriendships(id) {
    let q = `
    SELECT users.id, first, last, avatar, accepted
    FROM friendships
    JOIN users
    ON (accepted = false AND recipient_id = $1 AND requester_id = users.id)
    OR (accepted = true AND recipient_id = $1 AND requester_id = users.id)
    OR (accepted = true AND requester_id = $1 AND recipient_id = users.id)
`;
    let params = [id];
    return db.query(q, params);
};

exports.modifyFriendship = function modifyFriendship(
    uniqcode,
    requester,
    receiver,
    accepted
) {
    let q = `UPDATE friendships SET requester = $2, receiver = $3, accepted = $4 WHERE uniqcode = $1`;
    let params = [uniqcode, requester, receiver, accepted];
    return db.query(q, params);
};

// no friendship data yet - unqcode, requester, receiver, accepted , log
exports.addFriendship = function addFriendship(
    uniqcode,
    requester,
    receiver,
    accepted,
    log
) {
    let q = `INSERT INTO friendships (uniqcode, requester, receiver, accepted, statushistory ) VALUES ($1, $2, $3, $4, $5)`;
    let params = [uniqcode, requester, receiver, accepted, log];
    return db.query(q, params);
};

exports.friendshiplog = function friendshiplog(log, uniqcode) {
    let q = `UPDATE friendships SET statushistory = CONCAT(statushistory, $1::VARCHAR) WHERE uniqcode=$2`;
    let params = [String(log), uniqcode];
    return db.query(q, params);
};
