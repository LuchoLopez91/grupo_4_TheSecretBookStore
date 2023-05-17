const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, "./public/images/avatars");
        },
        filename: function (req, file, cb) {
            let filename = `${Date.now()}_img${path.extname(file.originalname)}`
            cb(null, filename);
        }
    })

const uploadFile = multer({ storage,
        fileFilter: (req, file, cb) => {
          if (file.mimetype == "image/png" || file.mimetype == "image/jpg"|| file.mimetype == "image/gif" || file.mimetype == "image/jpeg") {
            cb(null, true);
          } else {
            cb(null, false);
            return cb();
          }
        }
});

module.exports = multer({ storage: storage })