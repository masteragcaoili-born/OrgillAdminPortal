const encrypt = require('../middlewares/encrypt');
const dynamo = require('../dynamo');

const TableName = dynamo.tableName;
const dynamoClient = dynamo.dynamoClient;
const AWS = dynamo.AWS;


exports.getAllData = async(req, res) => {
  const params = {
    TableName: TableName,
  };
  try{
    let data = await dynamoClient.scan(params).promise();
    console.log(`Found ${data.Count} records`);
    let jsonData = data.Items
    let formatedJson = jsonData.map((data) => {
      let formatData = AWS.DynamoDB.Converter.unmarshall(data);
      return processData(formatData);
    });
    res.status(200).send(formatedJson);
  }
  catch(err) {
    console.error("Unable to find users", err);
    res.status(500).json(err);
  }
}

exports.getData = async(req, res) =>{
  const params = {
    TableName: TableName,
    Key: {
      id: { N: req.params.id.toString() },
    },
  };
  try {
    let data = await dynamoClient.getItem(params).promise()
    let formatData = AWS.DynamoDB.Converter.unmarshall(data.Item);
    let dataUser = processData(formatData);
    res.status(200).send(dataUser);
  } catch(err) {
    console.error("Unable to find user", err);
    res.status(500).json(err);
  }
}

exports.updateData = async (req, res) => {
  let id = '';
  if (req.body.id) {
    id  = req.body.id;
  }
  else {
    id = Date.now();
  }
  const params = {
    TableName: TableName,
    Item: {
      EPCC_url: { S: encrypt.Encrypt(req.body.EPCC_url) },
      uniqueRowId: { S: req.body.uniqueRowId },
      EPCC_clientSecret: { S: encrypt.Encrypt(req.body.EPCC_clientSecret) },
      EPCC_clientId: { S: encrypt.Encrypt(req.body.EPCC_clientId) },
      algolia_applicationId: { S: encrypt.Encrypt(req.body.algolia_applicationId) },
      algolia_url: { S: encrypt.Encrypt(req.body.algolia_url) },
      custom_orgill_url: { S: encrypt.Encrypt(req.body.custom_orgill_url) },
      dealaerId: { S: encrypt.Encrypt(req.body.dealaerId) },
      EPCC_storeId: { S: encrypt.Encrypt(req.body.EPCC_storeId) },
      dateModified: { S: getDate()},
      algolia_writeKey: { S: encrypt.Encrypt(req.body.algolia_writeKey) },
      algolia_searchKey: { S: encrypt.Encrypt(req.body.algolia_searchKey) },
      id: { N: id.toString() },
      algolia_adminKey: { S: encrypt.Encrypt(req.body.algolia_adminKey) },
      domain: { S: encrypt.Encrypt(req.body.domain) }
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  try {
    await dynamoClient.putItem(params).promise()
    res.status(200).json({success: true});
  } catch(err) {
    res.status(500).json(err);
  }
}

exports.deleteData = (req, res) => {
  const params = {
    TableName: TableName,
    Key: {
      id: {N: req.params.id.toString()}
    }
  }
  dynamoClient.deleteItem(params, function(err) {
    if (err) {
      console.error("Unable to find Data", err);
      res.status(500).json(err);
    } else {
      console.log(`Deleted ${req.params.id}`);
      res.status(200).json({success: true});
    }
  })

}

function getDate() {
  let currentdate = new Date();
  currentdate = [currentdate.getDate(), "/",
  (currentdate.getMonth()+1), "/",
  currentdate.getFullYear(), " ",
  currentdate.getHours(), ":",
  currentdate.getMinutes(), ":",
  currentdate.getSeconds()].join('')
  return currentdate;
}
// Decrypt outPut Data.
function processData(formatData) {
  return {
    EPCC_url: encrypt.Decrypt(formatData.EPCC_url),
    uniqueRowId: formatData.uniqueRowId,
    EPCC_clientSecret: encrypt.Decrypt(formatData.EPCC_clientSecret),
    EPCC_clientId: encrypt.Decrypt(formatData.EPCC_clientId),
    algolia_applicationId: encrypt.Decrypt(formatData.algolia_applicationId),
    algolia_url: encrypt.Decrypt(formatData.algolia_url),
    custom_orgill_url: encrypt.Decrypt(formatData.custom_orgill_url),
    dealaerId: encrypt.Decrypt(formatData.dealaerId),
    EPCC_storeId:  encrypt.Decrypt(formatData.EPCC_storeId),
    dateModified: formatData.dateModified,
    algolia_writeKey: encrypt.Decrypt(formatData.algolia_writeKey),
    algolia_searchKey: encrypt.Decrypt(formatData.algolia_searchKey),
    id: formatData.id,
    algolia_adminKey: encrypt.Decrypt(formatData.algolia_adminKey),
    domain: encrypt.Decrypt(formatData.domain)
  }
}

