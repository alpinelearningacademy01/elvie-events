const { S3Client } = require('@aws-sdk/client-s3');
const { NodeHttpHandler } = require('@smithy/node-http-handler');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
require('dotenv').config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    requestHandler: new NodeHttpHandler({
        connectionTimeout: 300000, // 5 minutes
        socketTimeout: 300000,
    }),
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, `properties/${Date.now().toString()}-${file.originalname}`);
        }
    })
});

module.exports = { upload, s3 };
