const AWS = require('aws-sdk');
const config = require('./config/config');

AWS.config.update({
  region: config.region,
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsAccessSecret,
});

module.exports = {
  dynamoClient: new AWS.DynamoDB(),
  tableName: config.configTableName,
  AWS: AWS
}