var multer = function() {};

multer.multer = require('multer');

multer.optsBasic = {
    dest: './uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
};

multer.upload = function(opts) {
    return multer.multer(opts);
}

module.exports = multer;