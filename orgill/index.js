const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
const cors = require('cors');
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'DELETE'
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get("/", (req, res) => {
  res.send('Hello World');
});

require('./routes/routes')(app);
console.log(process.env.PORT);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
