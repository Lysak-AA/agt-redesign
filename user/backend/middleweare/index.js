const multer  = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const uploadMassagistPhoto = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.massagistUploadPath + req.headers.id);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    
      const upload = multer({ storage: storage, fileFilter: fileFilter });

      return upload.single('file');
}

const verifyMassagist = (req, res, next) => {
    jwt.verify(req.body.token, config.authentication.jwtSecret, (err) => {
        if(err){
          res.send(err)
        } else {
            next();
        }
    })
}



  module.exports = { uploadMassagistPhoto, verifyMassagist };