const multer = require ("multer");
const path = require("path");

const storage = multer.diskStorage(
    {
        destination: function (req, file, cb){
            cb(null,"./public/images/books");
        },
        filename: function(req, file, cb){
            cb(null, `${Date.now()}_cover_${path.extname(file.originalname)}`);
        }
    })
const uploadFile = multer({storage,
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