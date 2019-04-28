const knox = require("knox-s3");
const fs = require("fs");

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

exports.upload = function(req, res, next) {
    console.log("UPLOAD");
    if (!req.file) {
        console.log("s3Request: no req.file");
        return res.sendStatus(500);
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
