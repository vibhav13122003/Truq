require('dotenv').config();

const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Configure S3 client for DigitalOcean Spaces
const s3 = new S3Client({
    region: "blr1", // replace with your Space region
    endpoint: "https://blr1.digitaloceanspaces.com", // Spaces endpoint
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hazard-uploads", // your Space name
        acl: "public-read", // allows public URL
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed!"), false);
    },
});

module.exports = upload;
