const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}- ${file.originalname}`);
  },
});

const fileFilter = function (req, file, cb) {
  const isMimetype = file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  return cb(null, isMimetype);
};

const upload = multer({ fileFilter, storage });

module.exports = upload;