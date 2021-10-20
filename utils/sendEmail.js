const AWS = require("aws-sdk");
require("dotenv").config();

const { AWSAccessKeyId, AWSSecretKey, AWS_REGION, BUCKET_NAME } = process.env;

AWS.config.update({
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
  region: AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.sendEmail = (userData, imageUrl) => {
  const { name, email } = userData;
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<html>
            <body>
            <h2>Hello User</h2>
            <p> Your chart image below</p>
            <img src="${imageUrl}">
            </body>
          </html>`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Testing with this email",
      },
    },
  };
  console.log(imageUrl);
  ses.sendEmail(params).promise();
};
