const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${shortid.generate()}-${file.originalname}`
    )
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

exports.upload = multer({storage});