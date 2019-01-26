// Multer
    var multer = require('multer');
    // Path
    var path = require('path');
    //set storage engine
    const storage = multer.diskStorage({
        destination: path.join(__dirname + '/public/images/'),
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    //init upload
    const upload = multer({
        storage: storage
    });

    module.exports = upload;