const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config(); // load env

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dp6awhvd5",
  api_key: process.env.CLOUDINARY_API_KEY || "915274288297543",
  api_secret: process.env.CLOUDINARY_API_SECRET || "PLcTRDOOAwVWE57lRMBxqbsEsZU"
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "courses",
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
