var spicedPg = require("spiced-pg");

var db;
const { localdataBase } = require("../secret");
db = spicedPg(localdataBase());
//db = spicedPg(process.env.DATABASE_URL);

exports.createUser = function createUser(first, last, email, passw) {
    let q = `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id AS export_id`;
    let params = [first, last, email, passw];
    return db.query(q, params);
};
