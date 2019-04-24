var spicedPg = require("spiced-pg");

var db;
const { localdataBase } = require("./secret");
db = spicedPg(localdataBase());
//db = spicedPg(process.env.DATABASE_URL);
