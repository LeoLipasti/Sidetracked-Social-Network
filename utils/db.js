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

exports.findUser = function findUser(id) {
    let q = `SELECT firstname AS first, lastname AS last, avatar FROM users WHERE id=$1`;
    let params = [id];
    return db.query(q, params);
};

exports.queryLogin = function queryLogin(email) {
    let q = `SELECT password FROM users WHERE lower(email) = lower($1)`;
    let params = [email];
    return db.query(q, params);
};

exports.queryLoginID = function queryLoginID(email) {
    let q = `SELECT id FROM users WHERE lower(email) = lower($1)`;
    let params = [email];
    return db.query(q, params);
};
