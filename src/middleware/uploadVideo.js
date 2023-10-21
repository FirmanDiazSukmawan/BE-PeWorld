const multer = require("multer");
// const path = require("path");

const multerUpload = multer({
  storage: multer.diskStorage({
    // destination: (req, file, cb) => {
    //   if (file.fieldname === "video") {
    //     cb(null, "./public/video");
    //   } else if (file.fieldname === "image") {
    //     cb(null, "./public/image");
    //   } else {
    //     cb("Invalid fieldname", null);
    //   }
    // },
    // filename: (req, file, cb) => {
    //   const ext = path.extname(file.originalname);
    //   const fileName = `${Date.now()}${ext}`;
    //   cb(null, fileName);
    // },
  }),
  fileFilter: (req, file, cb) => {
    // const ext = path.extname(file.originalname);
    const maxSize = 100 * 1024 * 1024;
    const maxSizeImage = 2 * 1024 * 1024;
    // console.log(file);

    if (file.fieldname === "image") {
      if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
      ) {
        if (file.size > maxSizeImage) {
          const error = {
            message: "File size exceeds 2 MB",
          };
          return cb(error, false);
        } else {
          cb(null, true);
        }
      } else {
        const error = {
          message: "File must be jpeg, jpg, or png",
        };
        cb(error, false);
      }
    } else if (file.fieldname === "video") {
      if (file.mimetype === "video/mp4" || file.mimetype === "video/mpeg") {
        if (file.size > maxSize) {
          const error = {
            message: "File size exceeds 100 MB",
          };
          return cb(error, false);
        } else {
          cb(null, true);
        }
      } else {
        const error = {
          message: "File must be mp4 or mpeg",
        };
        cb(error, false);
      }
    } else {
      const error = {
        message: "Invalid fieldname",
      };
      cb(error, false);
    }
  },
});

// middleware
const uploadImageAndVideo = (req, res, next) => {
  const multerSingle = multerUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]);
  // const multerSingle = multerUpload.array("file", 2);
  multerSingle(req, res, (err) => {
    if (err) {
      res.status(400).json({
        message: "Error uploading",
        err: err.message,
      });
    } else {
      next();
    }
  });
};

module.exports = uploadImageAndVideo;
