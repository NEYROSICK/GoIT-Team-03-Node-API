const multer = require("multer");
const path = require("path");
// const nanoid = require("nanoid");
const tempDir = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  // destination: path.resolve(__dirname, "../tmp"),
  // filename: (req, file, cb) => {
  //   const uniqueSuffix = nanoid();
  //   cb(null, uniqueSuffix + file.originalname);
  // },
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

const upload = multer({ storage });

module.exports = upload;
