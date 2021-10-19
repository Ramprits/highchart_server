require("dotenv").config()
const {v4: uuidv4} = require('uuid');
const imageUpload = async (base64) => {
    const AWS = require('aws-sdk');
    const {AWSAccessKeyId, AWSSecretKey, AWS_REGION, BUCKET_NAME} = process.env;

    // Configure AWS to use promise
    AWS.config.setPromisesDependency(require('bluebird'));
    AWS.config.update({accessKeyId: AWSAccessKeyId, secretAccessKey: AWSSecretKey, region: AWS_REGION});

    const s3 = new AWS.S3();
    let location = '';
    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // const type = base64.split(';')[0].split('/')[1];
    const type = "png";
    const userId = uuidv4();

    const params = {
        Bucket: BUCKET_NAME,
        Key: `${userId}.${type}`, // type is not required
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}` // required. Notice the back ticks
    }

    // see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property

    try {
        const {Location, Key} = await s3.upload(params).promise();
        location = Location;
    } catch (error) {
        console.log(error)
    }
    return location;
    // To delete, see: https://gist.github.com/SylarRuby/b3b1430ca633bc5ffec29bbcdac2bd52
}

module.exports = imageUpload;