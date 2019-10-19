const  config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const studyResources = require('./controllers/studyResources');

app.use(cors());
app.use(bodyParser.json());
//middleware



module.exports = app;