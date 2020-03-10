var multerS3 = function() {};

multerS3.multer = require('multer');
multerS3.multerS3 = require('multer-s3');
multerS3.AWS = require('aws-sdk');
multerS3.AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region : 'ap-northeast-2'
});
multerS3.S3 = new AWS.S3();

multerS3.optsBasic = {
    limits: { fileSize: 5 * 1024 * 1024 },
}
multerS3.storageBasic = {
    s3: S3,
    bucket: 'bucket',
    ContentType: multerS3.multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
        cb(null, 'assignment/ImageMath_'+ Date.now() + '.png')
    },
    acl: 'public-read',
}

multerS3.upload = function(opts, storage) {
    return multerS3.multer(Object.assign({ storage: multerS3.multerS3(storage) }, opts));
}

module.exports = multerS3;