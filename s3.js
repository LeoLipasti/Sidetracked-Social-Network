const knox = require("knox-s3");
const fs = require("fs");

const config = require("./config");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: "kolperi"
});

exports.deleteLastAvatar = function(queryurl) {
    let url = queryurl.rows[0].avatar;
    if (url.split("/")[1] != "avatars") {
        client
            .del(url.replace(config.s3Url, "/"))
            .on("response", s3Response => {
                let log = s3Response.statusCode;
            })
            .end(() => {
                return;
            });
    } else {
        console.log("was default avatar");
        return;
    }
};

exports.upload = function(req, res, next) {
    if (!req.file) {
        console.log("s3Request: no req.file");
        // no req image file. however we can continue because its most likely bio update
        next();
        return;
    }
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        "x-amz-acl": "public-read"
    });
    const stream = fs.createReadStream(req.file.path);
    stream.pipe(s3Request);

    s3Request.on("response", s3Response => {
        if (s3Response.statusCode == 200) {
            next();
            fs.unlink(req.file.path, () => {});
        } else {
            console.log("s3Request: 500");
            res.sendStatus(500);
        }
    });
};
