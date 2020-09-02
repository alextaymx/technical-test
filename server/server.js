const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { userRank } = require("./userRank");

//cross origin request
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploadedFiles");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now() + ".txt");
        // cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).array("file");

const processFiles = (files) => {
    let content = "";
    try {
        files.forEach((file) => {
            content +=
                fs.readFileSync(`uploadedFiles/${file.filename}`, "utf8") +
                "\n";
        });
        return userRank(content);
    } catch (e) {
        console.log("Error:", e.stack);
    }
};

app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        console.log("number of files: ", req.files.length);
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }
        const result = processFiles(req.files);
        console.log(result, "after processing");
        return res.status(200).send(JSON.stringify(result));
    });
});

app.listen(4000, function () {
    console.log("Server running on port 4000");
});
